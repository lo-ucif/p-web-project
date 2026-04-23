(function () {
  const formatPrice = (value) => `$${Number(value).toFixed(2)}`;

  const ProductPage = {
    product: null,
    storage: "",
    color: "",
    imageIndex: 0,
    init() {
      const id = new URLSearchParams(window.location.search).get("id");
      this.product = ProductData.byId(id);
      if (!this.product) {
        window.location.href = "index.html";
        return;
      }
      this.storage = this.product.storageOptions[0];
      this.color = this.product.colorOptions[0];
      this.render();
    },
    render() {
      document.getElementById("productTitle").textContent = this.product.name;
      document.getElementById("productPrice").textContent = formatPrice(this.product.price);
      document.getElementById("availability").textContent = this.product.availability;
      document.getElementById("productDesc").textContent = this.product.description;
      document.getElementById("mainImage").src = this.product.images[this.imageIndex];

      const specsGrid = document.getElementById("specsGrid");
      specsGrid.innerHTML = Object.entries(this.product.specs)
        .map(([key, value]) => `<div class="summary-row"><span>${key}</span><strong>${value}</strong></div>`)
        .join("");

      this.renderOptions("storageOptions", "storage", this.product.storageOptions);
      this.renderOptions("colorOptions", "color", this.product.colorOptions);
      this.renderThumbnails();

      document.getElementById("addToCartBtn").onclick = () => {
        CartStore.add(this.product, 1, this.storage, this.color);
        alert("Added to cart");
      };
    },
    renderOptions(targetId, type, values) {
      const target = document.getElementById(targetId);
      target.innerHTML = values
        .map((value) => `<button class="option-btn ${this[type] === value ? "active" : ""}" data-type="${type}" data-value="${value}">${value}</button>`)
        .join("");

      target.querySelectorAll(".option-btn").forEach((button) => {
        button.addEventListener("click", () => {
          this[type] = button.dataset.value;
          this.render();
        });
      });
    },
    renderThumbnails() {
      const row = document.getElementById("thumbnailRow");
      row.innerHTML = this.product.images
        .map((img, index) => `
          <button class="thumb-btn ${this.imageIndex === index ? "active" : ""}" data-index="${index}">
            <img src="${img}" alt="Thumbnail ${index + 1}" style="aspect-ratio:1/1; object-fit:cover; border-radius:8px;">
          </button>
        `)
        .join("");

      row.querySelectorAll(".thumb-btn").forEach((button) => {
        button.addEventListener("click", () => {
          this.imageIndex = Number(button.dataset.index);
          this.render();
        });
      });
    }
  };

  const CartPage = {
    init() {
      this.render();
    },
    render() {
      const items = CartStore.get();
      const list = document.getElementById("cartItems");
      if (!list) return;

      if (!items.length) {
        list.innerHTML = "<p class='text-muted'>Your cart is empty. Go back to products.</p>";
      } else {
        list.innerHTML = items
          .map((item, index) => `
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
          `)
          .join("");

        list.querySelectorAll(".qty-input").forEach((input) => {
          input.addEventListener("change", () => {
            CartStore.updateQuantity(Number(input.dataset.index), Number(input.value));
            this.render();
          });
        });

        list.querySelectorAll("[data-remove]").forEach((button) => {
          button.addEventListener("click", () => {
            CartStore.remove(Number(button.dataset.remove));
            this.render();
          });
        });
      }

      const subtotal = CartStore.subtotal();
      const tax = subtotal * 0.1;
      const total = subtotal + tax + 25;

      document.getElementById("subtotal").textContent = formatPrice(subtotal);
      document.getElementById("tax").textContent = formatPrice(tax);
      document.getElementById("total").textContent = formatPrice(total);
      CartStore.updateCount();
    }
  };

  document.addEventListener("DOMContentLoaded", async () => {
    CartStore.updateCount();

    if (window.ProductData) {
      await ProductData.load();
    }

    const page = document.body.dataset.page;
    if (page === "product") ProductPage.init();
    if (page === "cart") CartPage.init();
  });

  window.formatPrice = formatPrice;
})();
