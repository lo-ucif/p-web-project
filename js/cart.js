const Cart = {
    KEY: 'techstore_cart',
    items: [],
    
    init() {
        this.load();
        this.updateUI();
    },
    
    load() {
        const data = localStorage.getItem(this.KEY);
        this.items = data ? JSON.parse(data) : [];
    },
    
    save() {
        localStorage.setItem(this.KEY, JSON.stringify(this.items));
        this.updateUI();
    },
    
    add(product, quantity = 1, selectedColor = null, selectedStorage = null) {
        const existingIndex = this.items.findIndex(item => 
            item.id === product.id && 
            item.selectedColor === selectedColor && 
            item.selectedStorage === selectedStorage
        );
        
        if (existingIndex > -1) {
            this.items[existingIndex].quantity += quantity;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                brand: product.brand,
                price: product.price,
                image: product.image,
                quantity: quantity,
                selectedColor: selectedColor,
                selectedStorage: selectedStorage
            });
        }
        
        this.save();
        this.showToast(`${product.name} added to cart!`, 'success');
    },
    
    remove(productId, selectedColor = null, selectedStorage = null) {
        this.items = this.items.filter(item => 
            !(item.id === productId && 
              item.selectedColor === selectedColor && 
              item.selectedStorage === selectedStorage)
        );
        this.save();
    },
    
    updateQuantity(productId, quantity, selectedColor = null, selectedStorage = null) {
        const item = this.items.find(item => 
            item.id === productId && 
            item.selectedColor === selectedColor && 
            item.selectedStorage === selectedStorage
        );
        
        if (item) {
            if (quantity <= 0) {
                this.remove(productId, selectedColor, selectedStorage);
            } else {
                item.quantity = quantity;
                this.save();
            }
        }
    },
    
    getItems() {
        return this.items;
    },
    
    getCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    
    getSubtotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    
    getTax() {
        return this.getSubtotal() * 0.1;
    },
    
    getTotal() {
        return this.getSubtotal() + this.getTax();
    },
    
    clear() {
        this.items = [];
        this.save();
    },
    
    updateUI() {
        const countElements = document.querySelectorAll('.cart-count');
        const count = this.getCount();
        
        countElements.forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? 'block' : 'none';
        });
    },
    
    showToast(message, type = 'success') {
        const existingToast = document.querySelector('.toast');
        if (existingToast) existingToast.remove();
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Cart;
}
