(function () {
  const KEY = "tech_store_cart";

  const CartStore = {
    get() {
      try {
        return JSON.parse(localStorage.getItem(KEY) || "[]");
      } catch (_error) {
        return [];
      }
    },
    save(items) {
      localStorage.setItem(KEY, JSON.stringify(items));
      this.updateCount();
    },
    add(product, quantity, storage, color) {
      const items = this.get();
      const index = items.findIndex(
        (item) =>
          item.id === product.id &&
          item.storage === storage &&
          item.color === color,
      );
      if (index >= 0) {
        items[index].quantity += quantity;
      } else {
        items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          quantity,
          storage,
          color,
        });
      }
      this.save(items);
    },
    remove(index) {
      const items = this.get();
      items.splice(index, 1);
      this.save(items);
    },
    updateQuantity(index, quantity) {
      const items = this.get();
      if (!items[index]) return;
      items[index].quantity = Math.max(1, Number(quantity) || 1);
      this.save(items);
    },
    count() {
      return this.get().reduce((sum, item) => sum + item.quantity, 0);
    },
    subtotal() {
      return this.get().reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );
    },
    clear() {
      localStorage.removeItem(KEY);
      this.updateCount();
    },
    updateCount() {
      const countElements = document.querySelectorAll("#cartCount");
      countElements.forEach((el) => {
        el.textContent = String(this.count());
      });
    },
  };

  window.CartStore = CartStore;
})();
