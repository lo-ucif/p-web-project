(function () {
  const cartCount = document.getElementById("cartCount");
  if (cartCount && window.CartStore) {
    cartCount.textContent = String(CartStore.count());
  }

  const form = document.getElementById("checkoutForm");
  if (!form) return;

  const fields = {
    fullName: { input: document.getElementById("fullName"), error: document.getElementById("fullNameError") },
    address: { input: document.getElementById("address"), error: document.getElementById("addressError") },
    phone: { input: document.getElementById("phone"), error: document.getElementById("phoneError") },
    payment: { input: document.getElementById("payment"), error: document.getElementById("paymentError") }
  };

  const validators = {
    fullName: (value) => value.trim().length >= 3,
    address: (value) => value.trim().length >= 6,
    phone: (value) => /^\+?[0-9\s-]{8,}$/.test(value.trim()),
    payment: (value) => value.trim().length > 0
  };

  function setError(key, isValid) {
    const item = fields[key];
    item.error.classList.toggle("visible", !isValid);
    item.input.style.borderColor = isValid ? "var(--border)" : "#ef476f";
  }

  function validateAll() {
    let allValid = true;
    Object.keys(fields).forEach((key) => {
      const value = fields[key].input.value;
      const isValid = validators[key](value);
      setError(key, isValid);
      if (!isValid) allValid = false;
    });
    return allValid;
  }

  Object.keys(fields).forEach((key) => {
    fields[key].input.addEventListener("input", () => {
      setError(key, validators[key](fields[key].input.value));
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateAll()) return;

    alert("Order submitted successfully.");
    localStorage.removeItem("tech_store_cart");
    window.location.href = "index.html";
  });
})();
