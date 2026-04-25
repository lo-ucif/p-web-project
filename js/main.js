// ============================================
// Main Module
// Handles Product Page and Cart Page functionality
// ============================================

// Format number as price string (e.g., 100 -> "$100.00")
function formatPrice(value) {
  return "$" + Number(value).toFixed(2);
}

// ============================================
// Product Page Handler
// ============================================
const ProductPage = {
  // Current product data
  product: null,
  
  // Selected options
  selectedStorage: "",
  selectedColor: "",
  selectedImageIndex: 0,
  
  // Initialize product page
  init() {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    
    // Find product in data
    this.product = ProductData.findById(productId);
    
    // Redirect to home if product not found
    if (!this.product) {
      window.location.href = "index.html";
      return;
    }
    
    // Set default options (first option in each list)
    this.selectedStorage = this.product.storageOptions[0];
    this.selectedColor = this.product.colorOptions[0];
    
    // Render the page
    this.render();
  },
  
  // Render the product page
  render() {
    // Update basic info
    document.getElementById("productTitle").textContent = this.product.name;
    document.getElementById("productPrice").textContent = formatPrice(this.product.price);
    document.getElementById("availability").textContent = this.product.availability;
    document.getElementById("productDesc").textContent = this.product.description;
    
    // Update main image
    document.getElementById("mainImage").src = this.product.images[this.selectedImageIndex];
    
    // Render specs grid
    this.renderSpecs();
    
    // Render option buttons
    this.renderStorageOptions();
    this.renderColorOptions();
    
    // Render image thumbnails
    this.renderThumbnails();
    
    // Set up add to cart button
    document.getElementById("addToCartBtn").onclick = () => {
      CartStore.add(this.product, 1, this.selectedStorage, this.selectedColor);
      alert("Added to cart");
    };
  },
  
  // Render product specs
  renderSpecs() {
    const specsGrid = document.getElementById("specsGrid");
    const specsHtml = Object.keys(this.product.specs).map(key => {
      const value = this.product.specs[key];
      return `<div class="summary-row"><span>${key}</span><strong>${value}</strong></div>`;
    });
    specsGrid.innerHTML = specsHtml.join("");
  },
  
  // Render storage option buttons
  renderStorageOptions() {
    this.renderOptionButtons("storageOptions", "selectedStorage", this.product.storageOptions);
  },
  
  // Render color option buttons
  renderColorOptions() {
    this.renderOptionButtons("colorOptions", "selectedColor", this.product.colorOptions);
  },
  
  // Generic function to render option buttons
  renderOptionButtons(elementId, stateProperty, options) {
    const container = document.getElementById(elementId);
    
    // Generate button HTML
    const buttonsHtml = options.map(option => {
      const activeClass = this[stateProperty] === option ? "active" : "";
      return `<button class="option-btn ${activeClass}" data-type="${stateProperty}" data-value="${option}">${option}</button>`;
    });
    
    container.innerHTML = buttonsHtml.join("");
    
    // Add click listeners
    container.querySelectorAll(".option-btn").forEach(button => {
      button.addEventListener("click", () => {
        this[stateProperty] = button.dataset.value;
        this.render();
      });
    });
  },
  
  // Render image thumbnails
  renderThumbnails() {
    const thumbnailRow = document.getElementById("thumbnailRow");
    
    // Generate thumbnail HTML
    const thumbnailsHtml = this.product.images.map((image, index) => {
      const activeClass = this.selectedImageIndex === index ? "active" : "";
      return `
        <button class="thumb-btn ${activeClass}" data-index="${index}">
          <img src="${image}" alt="Thumbnail ${index + 1}" style="aspect-ratio:1/1; object-fit:cover; border-radius:8px;">
        </button>
      `;
    });
    
    thumbnailRow.innerHTML = thumbnailsHtml.join("");
    
    // Add click listeners
    thumbnailRow.querySelectorAll(".thumb-btn").forEach(button => {
      button.addEventListener("click", () => {
        this.selectedImageIndex = Number(button.dataset.index);
        this.render();
      });
    });
  }
};

// ============================================
// Cart Page Handler
// ============================================
const CartPage = {
  // Initialize cart page
  init() {
    this.render();
  },
  
  // Render cart items and totals
  render() {
    const cartItems = CartStore.get();
    const cartListElement = document.getElementById("cartItems");
    
    // Exit if no cart list element
    if (!cartListElement) return;
    
    // Show empty cart message
    if (cartItems.length === 0) {
      cartListElement.innerHTML = "<p class='text-muted'>Your cart is empty. Go back to products.</p>";
    } else {
      // Render each cart item
      cartListElement.innerHTML = cartItems.map((item, index) => {
        return `
          <article class="cart-item">
            <img src="${item.image}" alt="${item.name}" style="width:90px; height:90px; border-radius:10px; object-fit:cover;">
            <div>
              <h3 style="margin-bottom:0.3rem;">${item.name}</h3>
              <p class="text-muted">${item.storage} / ${item.color}</p>
              <p style="font-weight:700; margin-top:0.35rem;">${formatPrice(item.price)}</p>
            </div>
            <div style="display:grid; gap:0.45rem; align-content:start; justify-items:end;">
              <input class="field qty-input" type="number" min="1" value="${item.quantity}" data-index="${index}">
              <button class="btn btn-danger" data-remove="${index}">Remove</button>
            </div>
          </article>
        `;
      }).join("");
      
      // Set up quantity input listeners
      cartListElement.querySelectorAll(".qty-input").forEach(input => {
        input.addEventListener("change", () => {
          const index = Number(input.dataset.index);
          const quantity = Number(input.value);
          CartStore.updateQuantity(index, quantity);
          this.render();
        });
      });
      
      // Set up remove button listeners
      cartListElement.querySelectorAll("[data-remove]").forEach(button => {
        button.addEventListener("click", () => {
          const index = Number(button.dataset.remove);
          CartStore.remove(index);
          this.render();
        });
      });
    }
    
    // Calculate totals
    const subtotal = CartStore.subtotal();
    const tax = subtotal * 0.1;          // 10% tax
    const shipping = 25;                 // Flat shipping rate
    const total = subtotal + tax + shipping;
    
    // Update totals display
    document.getElementById("subtotal").textContent = formatPrice(subtotal);
    document.getElementById("tax").textContent = formatPrice(tax);
    document.getElementById("total").textContent = formatPrice(total);
    
    // Update cart count in header
    CartStore.updateCount();
  }
};

// ============================================
// Initialize on Page Load
// ============================================
document.addEventListener("DOMContentLoaded", async () => {
  // Update cart count
  CartStore.updateCount();
  
  // Load product data if available
  if (window.ProductData) {
    await ProductData.load();
  }
  
  // Initialize the correct page
  const pageName = document.body.dataset.page;
  
  if (pageName === "product") {
    ProductPage.init();
  }
  
  if (pageName === "cart") {
    CartPage.init();
  }
});

// Make formatPrice available globally
window.formatPrice = formatPrice;