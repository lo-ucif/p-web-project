# TechHub - Mobile and Computer Store System

## Project Overview

TechHub is a comprehensive e-commerce platform for selling mobile phones, laptops, tablets, and accessories. Built for Constantine 2 University - Abdelhamid Mehri, Module: PWEB.

## Features

### Customer Features (Frontend)
- **Home Page**: Product catalog with grid layout, filtering, and sorting
- **Product Details**: Detailed product information with color/storage selection
- **Shopping Cart**: Add, update, remove items with persistent storage
- **Checkout**: Form validation, multiple payment methods
- **User Authentication**: Sign up, login, profile management
- **Order History**: Track past orders and status

### Admin Features
- **Dashboard**: Overview statistics and quick actions
- **Product Management**: Add, edit, delete products
- **Order Management**: View and update order status
- **User Management**: Block/unblock users, change roles

## Tech Stack

### Frontend
- HTML5
- CSS3 (Flexbox, Grid, Responsive Design)
- JavaScript (ES6+)
- LocalStorage for data persistence

### Backend (Optional)
- Node.js
- Express.js
- RESTful API

## Getting Started

### Frontend Only (No Installation Required)
1. Open `index.html` in a web browser
2. Start browsing products

### With Backend
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
3. Open `http://localhost:3000` in your browser

## Demo Credentials

### Admin Account
- Email: admin@techhub.com
- Password: admin123

### User Account
- Email: user@example.com
- Password: user123

## Project Structure

```
techhub/
├── index.html              # Home page
├── product.html             # Product details
├── cart.html                # Shopping cart
├── checkout.html           # Checkout page
├── login.html               # User login
├── signup.html              # User signup
├── profile.html             # User profile
├── order-history.html       # Order history
├── css/
│   ├── style.css           # Main styles
│   ├── responsive.css       # Responsive design
│   └── admin.css           # Admin panel styles
├── js/
│   ├── main.js             # Main functionality
│   ├── cart.js             # Cart management
│   ├── products.js          # Product data
│   ├── auth.js             # Authentication
│   └── checkout.js         # Checkout logic
├── pages/admin/
│   ├── login.html          # Admin login
│   ├── dashboard.html      # Admin dashboard
│   ├── products.html       # Product management
│   ├── orders.html         # Order management
│   └── users.html          # User management
├── backend/
│   ├── server.js           # Express server
│   ├── models/             # Data models
│   └── routes/             # API routes
├── package.json
└── README.md
```

## Requirements Met

- [x] Part 1: Frontend Only (HTML, CSS, JavaScript)
- [x] Part 2: Admin System
- [x] Part 3: Client Interface Enhancements
- [x] Part 4: Advanced Features (Backend API)

## Evaluation

First evaluation: Week of April 17th

## Authors

Constantine 2 University - Abdelhamid Mehri
Module: PWEB

## License

MIT License
