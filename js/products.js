(function () {
  const fallbackProducts = [
    {
      id: 1,
      name: "Apex X Pro 5G",
      brand: "Apex",
      type: "mobile",
      price: 899,
      newest: 202603,
      availability: "In Stock",
      description: "Flagship smartphone with AI camera and ultra fast charging.",
      storageOptions: ["128GB", "256GB", "512GB"],
      colorOptions: ["Obsidian", "Silver", "Blue"],
      specs: { RAM: "12GB", CPU: "Snapdragon 8 Gen 3", Battery: "5000mAh", Display: "6.7 OLED" },
      images: [
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=80",
        "https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=900&q=80"
      ]
    }
  ];

  const ProductData = {
    list: [],
    async load() {
      if (this.list.length) return this.list;
      try {
        const response = await fetch("data/products.json");
        if (!response.ok) throw new Error("failed");
        this.list = await response.json();
      } catch (_error) {
        this.list = fallbackProducts;
      }
      return this.list;
    },
    byId(id) {
      return this.list.find((item) => item.id === Number(id));
    },
    brands() {
      return [...new Set(this.list.map((item) => item.brand))];
    }
  };

  window.ProductData = ProductData;
})();
