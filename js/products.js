// ============================================
// Product Data Module
// Loads and manages product information
// ============================================

// Default/fallback products when JSON fails to load
const fallbackProducts = [
  {
    id: 1,
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    type: "mobile",
    price: 1199,
    newest: 202604,
    availability: "In Stock",
    description: "Premium Samsung flagship with advanced camera zoom and AI features.",
    storageOptions: ["256GB", "512GB", "1TB"],
    colorOptions: ["Titanium Black", "Titanium Gray", "Titanium Violet"],
    specs: {
      RAM: "12GB",
      CPU: "Snapdragon 8 Gen 3",
      Battery: "5000mAh",
      Display: "6.8 Dynamic AMOLED 2X",
      "Refresh Rate": "120Hz",
      Camera: "200MP + 50MP + 12MP + 10MP",
      OS: "Android 14",
      Charging: "45W wired"
    },
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511296265581-c2450046e2a4?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=80"
    ]
  }
];

// Product Data object
const ProductData = {
  // Array to store loaded products
  list: [],
  
  // Load products from JSON or use fallback
  async load() {
    // Already loaded, return cached data
    if (this.list.length > 0) {
      return this.list;
    }
    
    try {
      // Try to fetch products from JSON file
      const response = await fetch("data/products.json");
      
      if (response.ok) {
        this.list = await response.json();
      } else {
        console.warn("Failed to load products.json, using defaults");
        this.list = fallbackProducts;
      }
    } catch (error) {
      console.warn("Error loading products:", error);
      // Use fallback products if fetch fails
      this.list = fallbackProducts;
    }
    
    return this.list;
  },
  
  // Find product by ID
  findById(id) {
    return this.list.find(product => product.id === Number(id));
  },
  
  // Get list of unique brands
  getBrands() {
    // Use Set to get unique brand names
    const brands = this.list.map(product => product.brand);
    return [...new Set(brands)];
  }
};

// Make ProductData available globally
window.ProductData = ProductData;