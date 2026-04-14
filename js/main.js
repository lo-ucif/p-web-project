document.addEventListener('DOMContentLoaded', () => {
    Cart.init();
    Auth.updateUI();
    initNavigation();
});

function initNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (navActions) navActions.classList.toggle('active');
        });
    }
}

function showToast(message, type = 'success') {
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function formatPrice(price) {
    return '$' + price.toFixed(2);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function renderProducts(productsToRender, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (productsToRender.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search terms.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = productsToRender.map(product => `
        <div class="product-card fade-in" onclick="window.location.href='product.html?id=${product.id}'">
            ${product.badge ? `<span class="badge badge-${product.badge} product-badge">${product.badge.toUpperCase()}</span>` : ''}
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.parentElement.innerHTML='<i class=\\'fas fa-mobile-alt\\'></i>'">
            </div>
            <div class="product-info">
                <span class="product-brand">${product.brand}</span>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">
                    ${formatPrice(product.price)}
                    ${product.oldPrice ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>` : ''}
                </div>
                <div class="product-actions" onclick="event.stopPropagation()">
                    <button class="btn btn-primary btn-sm" onclick="addToCartFromCard(${product.id})">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function addToCartFromCard(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        Cart.add(product, 1, product.colors?.[0], product.storages?.[0]);
    }
}

function getProductById(id) {
    return products.find(p => p.id === parseInt(id));
}

function filterProducts(filters) {
    let filtered = [...products];
    
    if (filters.category && filters.category !== 'all') {
        filtered = filtered.filter(p => p.category === filters.category);
    }
    
    if (filters.brand && filters.brand !== 'all') {
        filtered = filtered.filter(p => p.brand.toLowerCase() === filters.brand.toLowerCase());
    }
    
    if (filters.minPrice) {
        filtered = filtered.filter(p => p.price >= parseFloat(filters.minPrice));
    }
    
    if (filters.maxPrice) {
        filtered = filtered.filter(p => p.price <= parseFloat(filters.maxPrice));
    }
    
    if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filtered = filtered.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.brand.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm)
        );
    }
    
    if (filters.sort) {
        switch (filters.sort) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            default:
                filtered.sort((a, b) => b.id - a.id);
        }
    }
    
    return filtered;
}

function getBrands() {
    return [...new Set(products.map(p => p.brand))];
}

function getCategories() {
    const categories = [...new Set(products.map(p => p.category))];
    return categories.map(c => ({
        value: c,
        label: c.charAt(0).toUpperCase() + c.slice(1)
    }));
}

function createStarRating(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}
