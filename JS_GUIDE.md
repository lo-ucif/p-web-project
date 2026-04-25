# JavaScript Project Guide
## Tech Store E-Commerce Website

This document explains how the JavaScript code works and how pages connect.

---

## Table of Contents
1. [Project Structure](#project-structure)
2. [How Pages Connect](#how-pages-connect)
3. [Code Overview](#code-overview)
4. [How to Use Each Module](#how-to-use-each-module)
5. [Common Tasks](#common-tasks)

---

## Project Structure

```
project-folder/
├── index.html      (Home page - product listing)
├── product.html  (Product details page)
├── cart.html     (Shopping cart page)
├── checkout.html (Checkout form page)
├── js/
│   ├── main.js       (Product & Cart pages)
│   ├── products.js  (Product data management)
│   ├── cart.js       (Cart storage)
│   ├── filter.js    (Home page filtering)
│   └── checkout.js  (Checkout validation)
└── data/
    └── products.json (Product database)
```

---

## How Pages Connect

The pages link together using HTML and URL parameters:

### Home (index.html) → Product (product.html)
- Link format: `<a href="product.html?id=1">View Details</a>`
- The `id=1` is passed in the URL
- Product page reads it: `new URLSearchParams(window.location.search).get("id")`

### Product (product.html) → Cart (cart.html)
- User clicks "Add to Cart" button
- CartStore.add() saves to localStorage
- User can click cart icon to go to cart.html

### Cart (cart.html) → Checkout (checkout.html)
- Link: `<a href="checkout.html">Checkout</a>`
- Cart page shows cart items from localStorage

### All Pages → Any Page
- Cart icon in header links to cart.html
- Logo links to index.html

---

## Code Overview

### 1. products.js - Product Data
**Purpose:** Load and manage product information

**Key Functions:**
```javascript
// Load products from JSON or fallback
ProductData.load()

// Find a single product by ID
ProductData.findById(id)

// Get list of unique brands
ProductData.getBrands()
```

**How it works:**
- Tries to fetch products.json
- If fail, uses fallbackProducts array
- Returns cached list on subsequent calls

---

### 2. cart.js - Cart Storage
**Purpose:** Save cart items in browser localStorage

**Key Functions:**
```javascript
// Get all cart items
CartStore.get()

// Add item to cart
CartStore.add(product, quantity, storage, color)

// Remove item by index
CartStore.remove(index)

// Update item quantity
CartStore.updateQuantity(index, quantity)

// Get total item count
CartStore.count()

// Get subtotal price
CartStore.subtotal()

// Clear all items
CartStore.clear()

// Update cart count in UI
CartStore.updateCount()
```

**localStorage:**
- Data stored in browser under key: `tech_store_cart`
- Persists even after page refresh
- Format: JSON array of cart items

---

### 3. filter.js - Home Page
**Purpose:** Filter and sort products on home page

**State:**
```javascript
HomePage.state = {
  brand: "all",      // Filter by brand
  maxPrice: 2500,    // Filter by max price
  type: "all",      // Filter by device type
  sort: "brand-asc" // Sort order
}
```

**Key Functions:**
```javascript
// Initialize page
HomePage.init()

// Get filtered & sorted products
HomePage.getFilteredProducts()

// Render products to grid
HomePage.renderProducts()
```

**HTML Elements Used:**
- `brandFilter` - Brand dropdown
- `priceRange` - Price slider
- `priceValue` - Price display
- `sortBy` - Sort dropdown
- `productGrid` - Product display area
- `input[name='deviceType']` - Radio buttons

---

### 4. checkout.js - Checkout Form
**Purpose:** Validate form and submit order

**Validation Rules:**
```javascript
fullName: min 3 characters
address: min 6 characters
phone: 8+ digits (can have +, -, spaces)
payment: not empty
```

**Key Functions:**
```javascript
// Validate single field
showFieldError(fieldName, isValid)

// Validate all fields
validateAllFields()
```

**HTML Elements Used:**
- `fullName`, `fullNameError`
- `address`, `addressError`
- `phone`, `phoneError`
- `payment`, `paymentError`

---

### 5. main.js - Product & Cart Pages
**Purpose:** Render product details and cart

#### ProductPage
```javascript
// Initialize with URL product ID
ProductPage.init()

// Render product info
ProductPage.render()

// Render storage/color options
ProductPage.renderStorageOptions()
ProductPage.renderColorOptions()

// Render image thumbnails
ProductPage.renderThumbnails()
```

#### CartPage
```javascript
// Initialize cart page
CartPage.init()

// Render cart items & totals
CartPage.render()
```

**Price Calculation:**
```
subtotal = sum(item.price × item.quantity)
tax = subtotal × 0.10 (10%)
shipping = $25 (flat rate)
total = subtotal + tax + shipping
```

---

## How to Use Each Module

### Adding a New Product
1. Edit `data/products.json` OR modify `fallbackProducts` in products.js
2. Add product object with all required fields

### Adding a New Filter
1. In filter.js, add state property:
   ```javascript
   state: {
     newFilter: "default", // Add here
     // ...existing filters
   }
   ```
2. In `bindEvents()`, add event listener
3. In `getFilteredProducts()`, add filter logic

### Changing Validation Rules
1. Edit validators object in checkout.js:
   ```javascript
   const validators = {
     fieldName: (value) => condition,
     // ...
   };
   ```

### Modifying Cart Calculation
1. In CartPage.render() in main.js, find:
   ```javascript
   const subtotal = CartStore.subtotal();
   const tax = subtotal * 0.1;
   const shipping = 25;
   const total = subtotal + tax + shipping;
   ```
2. Change the formulas

---

## Common Tasks

### How do I change the product image?
In products.js or JSON:
```javascript
images: ["new-image-url.jpg", "other.jpg"]
```

### How do I add a new brand filter?
1. Add brand to product data (brand field)
2. filter.js automatically picks it up via `ProductData.getBrands()`

### How do I change the tax rate?
In main.js, inside CartPage.render():
```javascript
const tax = subtotal * 0.1;  // Change 0.1 to your rate
```

### How do I change the shipping cost?
In main.js, inside CartPage.render():
```javascript
const shipping = 25;  // Change to your cost
```

### How do I add a new page?
1. Create new HTML file (e.g., about.html)
2. Add body data attribute:
   ```html
   <body data-page="about">
   ```
3. Create new JS module or extend existing:
   ```javascript
   const AboutPage = {
     init() { /* ... */ }
   };
   
   document.addEventListener("DOMContentLoaded", () => {
     if (document.body.dataset.page === "about") {
       AboutPage.init();
     }
   });
   ```

---

## Flow Diagram

```
                    ┌─────────────────┐
                    │   index.html     │
                    │  (Home Page)     │
                    │  filter.js       │
                    └────────┬────────┘
                             │ Click "View Details"
                             ▼
                    ┌─────────────────┐
                    │  product.html    │
                    │ (Product Page)  │
                    │   main.js        │
                    └────────┬────────┘
                             │ Click "Add to Cart"
                             ▼
                    ┌─────────────────┐
                    │ localStorage    │
                    │ (cart data)     │
                    └────────┬────────┘
                             │ Click cart icon
                             ▼
                    ┌─────────────────┐
                    │   cart.html      │
                    │ (Cart Page)     │
                    │   main.js        │
                    └────────┬────────┘
                             │ Click "Checkout"
                             ▼
                    ┌─────────────────┐
                    │ checkout.html    │
                    │ (Checkout Page) │
                    │ checkout.js     │
                    └─────────────────┘
```

---

## Quick Reference

| Page | JS File | Key Function |
|------|--------|--------------|
| Home | filter.js | HomePage.init() |
| Product | main.js | ProductPage.init() |
| Cart | main.js | CartPage.init() |
| Checkout | checkout.js | validateAllFields() |
| Any | cart.js | CartStore functions |

---

## Questions?

- **Data source:** products.js (load fallback or JSON)
- **Storage:** cart.js (localStorage)
- **Navigation:** HTML links with URL params
- **Styling:** CSS files (separate)

This guide covers the core JavaScript architecture. Refer to individual JS files for detailed comments on each function.