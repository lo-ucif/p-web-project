const products = [
    {
        id: 1,
        name: 'iPhone 15 Pro Max',
        brand: 'Apple',
        category: 'smartphone',
        price: 1199,
        oldPrice: 1299,
        image: 'https://via.placeholder.com/300x300/1a1a2e/ffffff?text=iPhone+15+Pro',
        images: [
            'https://via.placeholder.com/500x500/1a1a2e/ffffff?text=iPhone+15+Pro',
            'https://via.placeholder.com/500x500/2d2d44/ffffff?text=iPhone+15+Pro+Side',
            'https://via.placeholder.com/500x500/404060/ffffff?text=iPhone+15+Pro+Back'
        ],
        specs: {
            display: '6.7" Super Retina XDR',
            processor: 'A17 Pro Chip',
            ram: '8GB',
            storage: '256GB',
            camera: '48MP + 12MP + 12MP',
            battery: '4422mAh',
            os: 'iOS 17'
        },
        colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
        storages: ['256GB', '512GB', '1TB'],
        rating: 4.9,
        reviews: 2847,
        stock: 45,
        badge: 'new',
        description: 'The most powerful iPhone ever with A17 Pro chip, titanium design, and pro camera system.'
    },
    {
        id: 2,
        name: 'Samsung Galaxy S24 Ultra',
        brand: 'Samsung',
        category: 'smartphone',
        price: 1099,
        oldPrice: null,
        image: 'https://via.placeholder.com/300x300/1a1a2e/ffffff?text=Galaxy+S24+Ultra',
        images: [
            'https://via.placeholder.com/500x500/1a1a2e/ffffff?text=Galaxy+S24+Ultra',
            'https://via.placeholder.com/500x500/2d2d44/ffffff?text=Galaxy+S24+Side'
        ],
        specs: {
            display: '6.8" Dynamic AMOLED 2X',
            processor: 'Snapdragon 8 Gen 3',
            ram: '12GB',
            storage: '256GB',
            camera: '200MP + 12MP + 50MP + 10MP',
            battery: '5000mAh',
            os: 'Android 14'
        },
        colors: ['Titanium Black', 'Titanium Gray', 'Titanium Violet', 'Titanium Yellow'],
        storages: ['256GB', '512GB', '1TB'],
        rating: 4.8,
        reviews: 1923,
        stock: 32,
        badge: 'hot',
        description: 'AI-powered smartphone with built-in S Pen, 200MP camera, and titanium frame.'
    },
    {
        id: 3,
        name: 'MacBook Pro 16" M3 Max',
        brand: 'Apple',
        category: 'laptop',
        price: 2499,
        oldPrice: null,
        image: 'https://via.placeholder.com/300x300/2d2d44/ffffff?text=MacBook+Pro+16',
        images: [
            'https://via.placeholder.com/500x500/2d2d44/ffffff?text=MacBook+Pro+16'
        ],
        specs: {
            display: '16.2" Liquid Retina XDR',
            processor: 'Apple M3 Max',
            ram: '36GB',
            storage: '1TB SSD',
            camera: '1080p FaceTime HD',
            battery: '22 hours',
            os: 'macOS Sonoma'
        },
        colors: ['Space Black', 'Silver'],
        storages: ['1TB', '2TB', '4TB'],
        rating: 4.9,
        reviews: 856,
        stock: 18,
        badge: 'new',
        description: 'The most powerful MacBook Pro with M3 Max chip for extreme performance.'
    },
    {
        id: 4,
        name: 'Dell XPS 15',
        brand: 'Dell',
        category: 'laptop',
        price: 1799,
        oldPrice: 1999,
        image: 'https://via.placeholder.com/300x300/1a1a2e/ffffff?text=Dell+XPS+15',
        images: [
            'https://via.placeholder.com/500x500/1a1a2e/ffffff?text=Dell+XPS+15'
        ],
        specs: {
            display: '15.6" OLED 3.5K',
            processor: 'Intel Core i9-13900H',
            ram: '32GB DDR5',
            storage: '1TB SSD',
            camera: '720p HD',
            battery: '13 hours',
            os: 'Windows 11'
        },
        colors: ['Platinum Silver', 'Graphite'],
        storages: ['512GB', '1TB', '2TB'],
        rating: 4.6,
        reviews: 1243,
        stock: 25,
        badge: 'sale',
        description: 'Premium ultrabook with stunning OLED display and powerful Intel processor.'
    },
    {
        id: 5,
        name: 'iPad Pro 12.9"',
        brand: 'Apple',
        category: 'tablet',
        price: 1099,
        oldPrice: null,
        image: 'https://via.placeholder.com/300x300/667eea/ffffff?text=iPad+Pro',
        images: [
            'https://via.placeholder.com/500x500/667eea/ffffff?text=iPad+Pro'
        ],
        specs: {
            display: '12.9" Liquid Retina XDR',
            processor: 'Apple M2 Chip',
            ram: '8GB',
            storage: '256GB',
            camera: '12MP + 10MP',
            battery: '10 hours',
            os: 'iPadOS 17'
        },
        colors: ['Space Gray', 'Silver'],
        storages: ['256GB', '512GB', '1TB', '2TB'],
        rating: 4.8,
        reviews: 1567,
        stock: 38,
        badge: null,
        description: 'The ultimate iPad with M2 chip, ProMotion display, and Apple Pencil support.'
    },
    {
        id: 6,
        name: 'Samsung Galaxy Tab S9 Ultra',
        brand: 'Samsung',
        category: 'tablet',
        price: 999,
        oldPrice: 1099,
        image: 'https://via.placeholder.com/300x300/764ba2/ffffff?text=Galaxy+Tab+S9',
        images: [
            'https://via.placeholder.com/500x500/764ba2/ffffff?text=Galaxy+Tab+S9'
        ],
        specs: {
            display: '14.6" Dynamic AMOLED 2X',
            processor: 'Snapdragon 8 Gen 2',
            ram: '12GB',
            storage: '256GB',
            camera: '13MP + 8MP',
            battery: '11200mAh',
            os: 'Android 13'
        },
        colors: ['Graphite', 'Beige'],
        storages: ['256GB', '512GB'],
        rating: 4.7,
        reviews: 892,
        stock: 22,
        badge: 'sale',
        description: 'Massive tablet with S Pen included and DeX mode for desktop experience.'
    },
    {
        id: 7,
        name: 'AirPods Pro 2nd Gen',
        brand: 'Apple',
        category: 'accessory',
        price: 249,
        oldPrice: null,
        image: 'https://via.placeholder.com/300x300/ffffff/1a1a2e?text=AirPods+Pro',
        images: [
            'https://via.placeholder.com/500x500/ffffff/1a1a2e?text=AirPods+Pro'
        ],
        specs: {
            type: 'In-ear',
            connectivity: 'Bluetooth 5.3',
            noise_cancellation: 'Active',
            battery: '6 hours + 30 hours case',
            water_resistance: 'IPX4',
            features: 'Spatial Audio, Adaptive Transparency'
        },
        colors: ['White'],
        storages: null,
        rating: 4.8,
        reviews: 4532,
        stock: 120,
        badge: 'hot',
        description: 'Premium wireless earbuds with advanced noise cancellation and spatial audio.'
    },
    {
        id: 8,
        name: 'Sony WH-1000XM5',
        brand: 'Sony',
        category: 'accessory',
        price: 349,
        oldPrice: 399,
        image: 'https://via.placeholder.com/300x300/1a1a2e/ffffff?text=Sony+XM5',
        images: [
            'https://via.placeholder.com/500x500/1a1a2e/ffffff?text=Sony+XM5'
        ],
        specs: {
            type: 'Over-ear',
            connectivity: 'Bluetooth 5.2',
            noise_cancellation: 'Industry-leading ANC',
            battery: '30 hours',
            water_resistance: 'None',
            features: '360 Reality Audio, Multipoint'
        },
        colors: ['Black', 'Silver', 'Midnight Blue'],
        storages: null,
        rating: 4.9,
        reviews: 3211,
        stock: 67,
        badge: 'sale',
        description: 'Best-in-class noise canceling headphones with exceptional sound quality.'
    },
    {
        id: 9,
        name: 'Google Pixel 8 Pro',
        brand: 'Google',
        category: 'smartphone',
        price: 899,
        oldPrice: null,
        image: 'https://via.placeholder.com/300x300/4285f4/ffffff?text=Pixel+8+Pro',
        images: [
            'https://via.placeholder.com/500x500/4285f4/ffffff?text=Pixel+8+Pro'
        ],
        specs: {
            display: '6.7" LTPO OLED',
            processor: 'Google Tensor G3',
            ram: '12GB',
            storage: '128GB',
            camera: '50MP + 48MP + 48MP',
            battery: '5050mAh',
            os: 'Android 14'
        },
        colors: ['Obsidian', 'Porcelain', 'Bay'],
        storages: ['128GB', '256GB', '512GB', '1TB'],
        rating: 4.7,
        reviews: 1678,
        stock: 41,
        badge: 'new',
        description: 'AI-powered smartphone with exceptional camera capabilities and 7 years of updates.'
    },
    {
        id: 10,
        name: 'ASUS ROG Phone 8',
        brand: 'ASUS',
        category: 'smartphone',
        price: 999,
        oldPrice: 1099,
        image: 'https://via.placeholder.com/300x300/ff4444/ffffff?text=ROG+Phone+8',
        images: [
            'https://via.placeholder.com/500x500/ff4444/ffffff?text=ROG+Phone+8'
        ],
        specs: {
            display: '6.78" AMOLED 165Hz',
            processor: 'Snapdragon 8 Gen 3',
            ram: '16GB',
            storage: '256GB',
            camera: '50MP + 13MP + 5MP',
            battery: '5500mAh',
            os: 'Android 14'
        },
        colors: ['Phantom Black', 'Rebel Gray'],
        storages: ['256GB', '512GB'],
        rating: 4.8,
        reviews: 756,
        stock: 29,
        badge: 'sale',
        description: 'Ultimate gaming smartphone with 165Hz display and advanced cooling system.'
    },
    {
        id: 11,
        name: 'Lenovo ThinkPad X1 Carbon',
        brand: 'Lenovo',
        category: 'laptop',
        price: 1899,
        oldPrice: null,
        image: 'https://via.placeholder.com/300x300/1a1a2e/ffffff?text=ThinkPad+X1',
        images: [
            'https://via.placeholder.com/500x500/1a1a2e/ffffff?text=ThinkPad+X1'
        ],
        specs: {
            display: '14" 2.8K OLED',
            processor: 'Intel Core i7-1365U',
            ram: '16GB LPDDR5',
            storage: '512GB SSD',
            camera: '1080p + IR',
            battery: '15 hours',
            os: 'Windows 11'
        },
        colors: ['Black', 'Carbon Fiber'],
        storages: ['512GB', '1TB', '2TB'],
        rating: 4.7,
        reviews: 943,
        stock: 31,
        badge: null,
        description: 'Ultra-lightweight business laptop with exceptional keyboard and durability.'
    },
    {
        id: 12,
        name: 'Anker PowerCore 26800',
        brand: 'Anker',
        category: 'accessory',
        price: 65,
        oldPrice: 79,
        image: 'https://via.placeholder.com/300x300/333333/ffffff?text=Anker+26800',
        images: [
            'https://via.placeholder.com/500x500/333333/ffffff?text=Anker+26800'
        ],
        specs: {
            capacity: '26800mAh',
            output: '30W PD',
            ports: '2 USB-C, 1 USB-A',
            input: 'USB-C PD',
            weight: '480g',
            features: 'Fast Charging, Multi-Device'
        },
        colors: ['Black'],
        storages: null,
        rating: 4.6,
        reviews: 8934,
        stock: 245,
        badge: 'sale',
        description: 'High-capacity portable charger for all your devices with fast charging support.'
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = products;
}
