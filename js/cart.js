// ============================================
// Cart Storage Module
// Handles saving cart items in localStorage
// ============================================

const CART_KEY = "tech_store_cart";

// Get all cart items from storage
function getCartItems() {
  try {
    const stored = localStorage.getItem(CART_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn("Error reading cart:", error);
  }
  return [];
}

// Save cart items to storage
function saveCartToStorage(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  updateCartCountDisplay();
}

// Add item to cart
function addToCart(product, quantity, storage, color) {
  const items = getCartItems();
  
  // Check if product already exists in cart with same options
  const existingItem = items.find(item => 
    item.id === product.id &&
    item.storage === storage &&
    item.color === color
  );
  
  if (existingItem) {
    // Increase quantity if already in cart
    existingItem.quantity += quantity;
  } else {
    // Add new item to cart
    items.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
      storage: storage,
      color: color
    });
  }
  
  saveCartToStorage(items);
}

// Remove item from cart by index
function removeFromCart(index) {
  const items = getCartItems();
  items.splice(index, 1);
  saveCartToStorage(items);
}

// Update quantity of an item
function updateItemQuantity(index, quantity) {
  const items = getCartItems();
  if (items[index]) {
    // Ensure quantity is at least 1
    items[index].quantity = Math.max(1, Number(quantity) || 1);
    saveCartToStorage(items);
  }
}

// Get total number of items in cart
function getCartTotalCount() {
  const items = getCartItems();
  return items.reduce((total, item) => total + item.quantity, 0);
}

// Get cart subtotal (total price before tax)
function getCartSubtotal() {
  const items = getCartItems();
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Clear all items from cart
function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartCountDisplay();
}

// Update the cart count display in the UI
function updateCartCountDisplay() {
  const countElements = document.querySelectorAll("#cartCount");
  const count = getCartTotalCount();
  countElements.forEach(element => {
    element.textContent = String(count);
  });
}

// Format price to display string
function formatPrice(value) {
  return "$" + Number(value).toFixed(2);
}

// Make functions available globally
window.CartStore = {
  get: getCartItems,
  save: saveCartToStorage,
  add: addToCart,
  remove: removeFromCart,
  updateQuantity: updateItemQuantity,
  count: getCartTotalCount,
  subtotal: getCartSubtotal,
  clear: clearCart,
  updateCount: updateCartCountDisplay
};