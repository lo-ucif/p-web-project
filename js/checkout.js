const Checkout = {
    KEY: 'techstore_orders',
    
    getOrders() {
        const data = localStorage.getItem(this.KEY);
        return data ? JSON.parse(data) : [];
    },
    
    saveOrders(orders) {
        localStorage.setItem(this.KEY, JSON.stringify(orders));
    },
    
    createOrder(orderData) {
        const orders = this.getOrders();
        const user = Auth.getCurrentUser();
        
        const order = {
            id: 'ORD-' + Date.now(),
            userId: user ? user.id : null,
            userEmail: user ? user.email : orderData.email,
            items: Cart.getItems(),
            subtotal: Cart.getSubtotal(),
            tax: Cart.getTax(),
            total: Cart.getTotal(),
            shipping: orderData,
            status: 'pending',
            paymentMethod: orderData.paymentMethod || 'cod',
            createdAt: new Date().toISOString()
        };
        
        orders.push(order);
        this.saveOrders(orders);
        
        if (user) {
            Auth.addOrder(order);
        }
        
        Cart.clear();
        
        return order;
    },
    
    getOrderById(orderId) {
        const orders = this.getOrders();
        return orders.find(o => o.id === orderId);
    },
    
    updateOrderStatus(orderId, status) {
        const orders = this.getOrders();
        const orderIndex = orders.findIndex(o => o.id === orderId);
        
        if (orderIndex > -1) {
            orders[orderIndex].status = status;
            orders[orderIndex].updatedAt = new Date().toISOString();
            this.saveOrders(orders);
            return true;
        }
        return false;
    },
    
    getUserOrders(userId) {
        const orders = this.getOrders();
        return orders.filter(o => o.userId === userId);
    },
    
    getAllOrders() {
        return this.getOrders();
    },
    
    validateForm(formData) {
        const errors = [];
        
        if (!formData.fullName || formData.fullName.trim().length < 3) {
            errors.push('Full name must be at least 3 characters.');
        }
        
        if (!formData.email || !this.isValidEmail(formData.email)) {
            errors.push('Please enter a valid email address.');
        }
        
        if (!formData.phone || !this.isValidPhone(formData.phone)) {
            errors.push('Please enter a valid phone number.');
        }
        
        if (!formData.address || formData.address.trim().length < 10) {
            errors.push('Please enter a complete address.');
        }
        
        if (!formData.city || formData.city.trim().length < 2) {
            errors.push('Please enter a valid city.');
        }
        
        if (!formData.zipCode || formData.zipCode.trim().length < 4) {
            errors.push('Please enter a valid postal code.');
        }
        
        return errors;
    },
    
    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    isValidPhone(phone) {
        const re = /^[\d\s\-\+\(\)]{8,}$/;
        return re.test(phone);
    },
    
    formatPrice(price) {
        return '$' + price.toFixed(2);
    },
    
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    
    getStatusClass(status) {
        const classes = {
            'pending': 'pending',
            'processing': 'processing',
            'shipped': 'shipped',
            'delivered': 'delivered',
            'cancelled': 'cancelled'
        };
        return classes[status] || 'pending';
    },
    
    getStatusLabel(status) {
        const labels = {
            'pending': 'Pending',
            'processing': 'Processing',
            'shipped': 'Shipped',
            'delivered': 'Delivered',
            'cancelled': 'Cancelled'
        };
        return labels[status] || status;
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Checkout;
}
