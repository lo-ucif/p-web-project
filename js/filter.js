(function () {
  const HomePage = {
    state: {
      brand: "all",
      maxPrice: 2500,
      type: "all",
      sort: "newest"
    },
    products: [],
    async init() {
      this.products = await ProductData.load();
      this.fillBrandOptions();
      this.bind();
      this.render();
      CartStore.updateCount();
    },
    fillBrandOptions() {
      const brandFilter = document.getElementById("brandFilter");
      if (!brandFilter) return;
      const options = ["<option value='all'>All Brands</option>"];
      ProductData.brands().forEach((brand) => options.push(`<option value="${brand}">${brand}</option>`));
      brandFilter.innerHTML = options.join("");
    },
    bind() {
      const brandFilter = document.getElementById("brandFilter");
      const priceRange = document.getElementById("priceRange");
      const sortBy = document.getElementById("sortBy");
      const priceValue = document.getElementById("priceValue");

      if (brandFilter) {
        brandFilter.addEventListener("change", () => {
          this.state.brand = brandFilter.value;
          this.render();
        });
      }

      if (priceRange && priceValue) {
        priceRange.addEventListener("input", () => {
          this.state.maxPrice = Number(priceRange.value);
          priceValue.textContent = `$${priceRange.value}`;
          this.render();
        });
      }

      if (sortBy) {
        sortBy.addEventListener("change", () => {
          this.state.sort = sortBy.value;
          this.render();
        });
      }

      document.querySelectorAll("input[name='deviceType']").forEach((radio) => {
        radio.addEventListener("change", () => {
          this.state.type = radio.value;
          this.render();
        });
      });
    },
    filtered() {
      let list = [...this.products];

      if (this.state.brand !== "all") {
        list = list.filter((item) => item.brand === this.state.brand);
      }

      if (this.state.type !== "all") {
        list = list.filter((item) => item.type === this.state.type);
      }

      list = list.filter((item) => item.price <= this.state.maxPrice);

      if (this.state.sort === "price-asc") list.sort((a, b) => a.price - b.price);
      if (this.state.sort === "price-desc") list.sort((a, b) => b.price - a.price);
      if (this.state.sort === "newest") list.sort((a, b) => b.newest - a.newest);

      return list;
    },
    render() {
      const grid = document.getElementById("productGrid");
      if (!grid) return;

      const filtered = this.filtered();
      if (!filtered.length) {
        grid.innerHTML = "<p class='text-muted'>No products match the current filters.</p>";
        return;
      }

      grid.innerHTML = filtered
        .map(
          (product) => `
            <article class="product-card">
              <img class="product-thumb" src="${product.images[0]}" alt="${product.name}">
              <h3 class="product-title">${product.name}</h3>
              <p class="text-muted" style="margin-bottom:0.2rem;">${product.brand} • ${product.type}</p>
              <p class="product-price">${formatPrice(product.price)}</p>
              <a class="btn btn-primary" href="product.html?id=${product.id}">View Details</a>
            </article>
          `
        )
        .join("");
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    if (document.body.dataset.page === "home") {
      HomePage.init();
    }
  });
})();
