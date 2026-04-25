// ============================================
// Checkout Page Module
// Handles form validation and order submission
// ============================================

(function() {
  // Update cart count in header
  const cartCountElement = document.getElementById("cartCount");
  if (cartCountElement && window.CartStore) {
    cartCountElement.textContent = String(CartStore.count());
  }

  // Get the checkout form
  const checkoutForm = document.getElementById("checkoutForm");
  if (!checkoutForm) return;

  // Form field references
  const formFields = {
    fullName: {
      input: document.getElementById("fullName"),
      error: document.getElementById("fullNameError")
    },
    address: {
      input: document.getElementById("address"),
      error: document.getElementById("addressError")
    },
    phone: {
      input: document.getElementById("phone"),
      error: document.getElementById("phoneError")
    },
    payment: {
      input: document.getElementById("payment"),
      error: document.getElementById("paymentError")
    }
  };

  // Validation rules for each field
  const validators = {
    fullName: (value) => value.trim().length >= 3,
    address: (value) => value.trim().length >= 6,
    phone: (value) => /^\+?[0-9\s-]{8,}$/.test(value.trim()),
    payment: (value) => value.trim().length > 0
  };

  // Show or hide error message for a field
  function showFieldError(fieldName, isValid) {
    const field = formFields[fieldName];
    
    // Toggle error message visibility
    field.error.classList.toggle("visible", !isValid);
    
    // Change border color (red if invalid, default if valid)
    const borderColor = isValid ? "var(--border)" : "#ef476f";
    field.input.style.borderColor = borderColor;
  }

  // Validate all form fields
  function validateAllFields() {
    let allValid = true;
    
    Object.keys(formFields).forEach(fieldName => {
      const value = formFields[fieldName].input.value;
      const isValid = validators[fieldName](value);
      
      showFieldError(fieldName, isValid);
      
      if (!isValid) {
        allValid = false;
      }
    });
    
    return allValid;
  }

  // Set up input event listeners for real-time validation
  Object.keys(formFields).forEach(fieldName => {
    const input = formFields[fieldName].input;
    
    input.addEventListener("input", () => {
      const value = input.value;
      const isValid = validators[fieldName](value);
      showFieldError(fieldName, isValid);
    });
  });

  // Handle form submission
  checkoutForm.addEventListener("submit", (event) => {
    // Prevent default form submission
    event.preventDefault();
    
    // Validate all fields
    if (!validateAllFields()) {
      return;
    }
    
    // Get cart items
    const cartItems = window.CartStore ? CartStore.get() : [];
    
    // Check if cart is empty
    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty. Add items before checkout.");
      return;
    }
    
    // Success! Clear cart and redirect
    alert("Order submitted successfully.");
    CartStore.clear();
    window.location.href = "index.html";
  });
})();