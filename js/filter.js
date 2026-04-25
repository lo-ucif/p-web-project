// ============================================
// Filter & Home Page Module
// Handles product filtering, sorting, and display
// ============================================

// Home page state management
const HomePage = {
  // Current filter/sort state
  state: {
    brand: "all",      // Selected brand filter
    maxPrice: 2500,   // Maximum price filter
    type: "all",      // Device type filter
    sort: "brand-asc" // Sort option
  },
  
  // Products array (loaded from ProductData)
  products: [],
  
  // Initialize the home page
  async init() {
    // Load products first
    this.products = await ProductData.load();
    
    // Fill brand dropdown with available brands
    this.populateBrandFilter();
    
    // Set up event listeners
    this.bindEvents();
    
    // Render initial product list
    this.renderProducts();
    
    // Update cart count
    CartStore.updateCount();
  },
  
  // Fill brand dropdown with unique brands
  populateBrandFilter() {
    const brandFilter = document.getElementById("brandFilter");
    if (!brandFilter) return;
    
    // Start with "All Brands" option
    const options = ['<option value="all">All Brands</option>'];
    
    // Add each unique brand as an option
    ProductData.getBrands().forEach(brand => {
      options.push(`<option value="${brand}">${brand}</option>`);
    });
    
    brandFilter.innerHTML = options.join("");
  },
  
  // Set up event listeners for filters
  bindEvents() {
    const brandFilter = document.getElementById("brandFilter");
    const priceRange = document.getElementById("priceRange");
    const sortBy = document.getElementById("sortBy");
    const priceValue = document.getElementById("priceValue");
    
    // Brand filter change
    if (brandFilter) {
      brandFilter.addEventListener("change", () => {
        this.state.brand = brandFilter.value;
        this.renderProducts();
      });
    }
    
    // Price range slider
    if (priceRange && priceValue) {
      priceRange.addEventListener("input", () => {
        this.state.maxPrice = Number(priceRange.value);
        priceValue.textContent = "$" + priceRange.value;
        this.renderProducts();
      });
    }
    
    // Sort option change
    if (sortBy) {
      sortBy.value = this.state.sort;
      sortBy.addEventListener("change", () => {
        this.state.sort = sortBy.value;
        this.renderProducts();
      });
    }
    
    // Device type radio buttons
    document.querySelectorAll("input[name='deviceType']").forEach(radio => {
      radio.addEventListener("change", () => {
        this.state.type = radio.value;
        this.renderProducts();
      });
    });
  },
  
  // Apply filters and return filtered product list
  getFilteredProducts() {
    let list = [...this.products];
    
    // Filter by brand
    if (this.state.brand !== "all") {
      list = list.filter(product => product.brand === this.state.brand);
    }
    
    // Filter by device type
    if (this.state.type !== "all") {
      list = list.filter(product => product.type === this.state.type);
    }
    
    // Filter by price
    list = list.filter(product => product.price <= this.state.maxPrice);
    
    // Sort the results
    switch (this.state.sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        list.sort((a, b) => b.newest - a.newest);
        break;
      case "brand-asc":
        list.sort((a, b) => a.brand.localeCompare(b.brand));
        break;
      case "brand-desc":
        list.sort((a, b) => b.brand.localeCompare(a.brand));
        break;
    }
    
    return list;
  },
  
  // Render products to the grid
  renderProducts() {
    const grid = document.getElementById("productGrid");
    if (!grid) return;
    
    // Get filtered products
    const filtered = this.getFilteredProducts();
    
    // Show message if no products match
    if (filtered.length === 0) {
      grid.innerHTML = "<p class='text-muted'>No products match the current filters.</p>";
      return;
    }
    
    // Generate HTML for each product
    grid.innerHTML = filtered.map(product => {
      return `
        <article class="product-card">
          <img class="product-thumb" src="${product.images[0]}" alt="${product.name}">
          <h3 class="product-title">${product.name}</h3>
          <p class="text-muted" style="margin-bottom:0.2rem;">${product.brand} • ${product.type}</p>
          <p class="text-muted" style="font-size:0.86rem; margin-bottom:0.15rem;">RAM: ${product.specs.RAM || "N/A"}</p>
          <p class="text-muted" style="font-size:0.86rem; margin-bottom:0.35rem;">CPU: ${product.specs.CPU || "N/A"}</p>
          <p class="product-price">${formatPrice(product.price)}</p>
          <a class="btn btn-primary" href="product.html?id=${product.id}">View Details</a>
        </article>
      `;
    }).join("");
  }
};

// Initialize when page loads
document.addEventListener("DOMContentLoaded", () => {
  // Only init if this is the home page
  if (document.body.dataset.page === "home") {
    HomePage.init();
  }
});