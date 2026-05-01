let products = [];
let orders = [];

async function initAdmin() {
  await loadProducts();
  loadOrders();
  setupNavigation();
  updateDashboard();
}

async function loadProducts() {
  try {
    const res = await fetch('data/products.json');
    products = await res.json();
  } catch (e) {
    products = [];
  }
}

function loadOrders() {
  const stored = localStorage.getItem('adminOrders');
  if (stored) {
    orders = JSON.parse(stored);
  } else {
    orders = generateMockOrders();
    saveOrders();
  }
}

function saveOrders() {
  localStorage.setItem('adminOrders', JSON.stringify(orders));
}

function generateMockOrders() {
  return [
    { id: 'ORD-001', customer: 'John Smith', email: 'john@example.com', items: [{ name: 'Samsung Galaxy S24 Ultra', qty: 1, price: 1199 }], total: 1199, status: 'Pending', date: '2026-04-28' },
    { id: 'ORD-002', customer: 'Emily Davis', email: 'emily@example.com', items: [{ name: 'Apple iPhone 15 Pro Max', qty: 1, price: 1249 }, { name: 'AirPods Pro', qty: 1, price: 249 }], total: 1498, status: 'In Progress', date: '2026-04-27' },
    { id: 'ORD-003', customer: 'Michael Brown', email: 'michael@example.com', items: [{ name: 'Dell XPS 15', qty: 1, price: 1799 }], total: 1799, status: 'Delivered', date: '2026-04-25' },
    { id: 'ORD-004', customer: 'Sarah Wilson', email: 'sarah@example.com', items: [{ name: 'Xiaomi 14 Pro', qty: 2, price: 898 }], total: 1798, status: 'In Progress', date: '2026-04-26' },
    { id: 'ORD-005', customer: 'David Lee', email: 'david@example.com', items: [{ name: 'MacBook Pro 14 M3', qty: 1, price: 1999 }], total: 1999, status: 'Pending', date: '2026-04-29' },
    { id: 'ORD-006', customer: 'Lisa Chen', email: 'lisa@example.com', items: [{ name: 'HP Spectre x360 14', qty: 1, price: 1549 }], total: 1549, status: 'Cancelled', date: '2026-04-24' },
    { id: 'ORD-007', customer: 'James Taylor', email: 'james@example.com', items: [{ name: 'Redmi Note 13 Pro+', qty: 1, price: 459 }, { name: 'Poco X6 Pro', qty: 1, price: 399 }], total: 858, status: 'Delivered', date: '2026-04-23' },
  ];
}

function setupNavigation() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      const view = item.dataset.view;
      showView(view);
    });
  });
}

function showView(view) {
  document.querySelectorAll('.view-section').forEach(v => v.style.display = 'none');
  document.getElementById(view + 'View').style.display = 'block';
  
  const titles = { dashboard: 'Dashboard', products: 'Product Management', orders: 'Order Management' };
  document.getElementById('pageTitle').textContent = titles[view] || 'Dashboard';
  
  if (view === 'products') renderProducts();
  if (view === 'orders') renderOrders();
}

function updateDashboard() {
  document.getElementById('statProducts').textContent = products.length;
  document.getElementById('statOrders').textContent = orders.length;
  document.getElementById('statActiveOrders').textContent = orders.filter(o => o.status === 'In Progress' || o.status === 'Pending').length;
  const revenue = orders.filter(o => o.status === 'Delivered').reduce((sum, o) => sum + o.total, 0);
  document.getElementById('statRevenue').textContent = '$' + revenue.toLocaleString();

  const tbody = document.getElementById('recentOrdersTable');
  tbody.innerHTML = orders.slice(0, 5).map(o => `
    <tr>
      <td>${o.id}</td>
      <td>${o.customer}</td>
      <td>$${o.total}</td>
      <td><span class="status-badge status-${o.status.toLowerCase().replace(' ', '')}">${o.status}</span></td>
      <td>${o.date}</td>
    </tr>
  `).join('');
}

function renderProducts() {
  const search = document.getElementById('productSearch').value.toLowerCase();
  const type = document.getElementById('productTypeFilter').value;
  const brand = document.getElementById('productBrandFilter').value;

  updateBrandFilter();

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search);
    const matchType = type === 'all' || p.type === type;
    const matchBrand = brand === 'all' || p.brand === brand;
    return matchSearch && matchType && matchBrand;
  });

  const tbody = document.getElementById('productsTable');
  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="empty-state">No products found</td></tr>';
    return;
  }

  tbody.innerHTML = filtered.map(p => `
    <tr>
      <td><img src="${p.images?.[0] || ''}" alt="${p.name}" class="product-preview"></td>
      <td>${p.name}</td>
      <td>${p.brand}</td>
      <td><span class="tag">${p.type}</span></td>
      <td>$${p.price}</td>
      <td>
        <button class="action-btn" onclick="editProduct(${p.id})">Edit</button>
      </td>
    </tr>
  `).join('');
}

function updateBrandFilter() {
  const brands = [...new Set(products.map(p => p.brand))];
  const select = document.getElementById('productBrandFilter');
  const current = select.value;
  select.innerHTML = '<option value="all">All Brands</option>' + brands.map(b => `<option value="${b}">${b}</option>`).join('');
  select.value = current;
}

function filterProducts() {
  renderProducts();
}

function openProductModal(product = null) {
  document.getElementById('productModal').classList.add('active');
  document.getElementById('productModalTitle').textContent = product ? 'Edit Product' : 'Add Product';
  if (product) {
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productBrand').value = product.brand;
    document.getElementById('productType').value = product.type;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productDescription').value = product.description || '';
    document.getElementById('productImage').value = product.images?.[0] || '';
  } else {
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
  }
}

function closeProductModal() {
  document.getElementById('productModal').classList.remove('active');
}

function saveProduct(e) {
  e.preventDefault();
  const id = document.getElementById('productId').value;
  const product = {
    id: id ? parseInt(id) : Date.now(),
    name: document.getElementById('productName').value,
    brand: document.getElementById('productBrand').value,
    type: document.getElementById('productType').value,
    price: parseFloat(document.getElementById('productPrice').value),
    description: document.getElementById('productDescription').value,
    images: [document.getElementById('productImage').value || 'https://via.placeholder.com/200'],
    specs: {},
    storageOptions: [],
    colorOptions: [],
    newest: 202606
  };

  if (id) {
    const idx = products.findIndex(p => p.id === parseInt(id));
    if (idx !== -1) products[idx] = { ...products[idx], ...product };
  } else {
    products.push(product);
  }

  localStorage.setItem('adminProducts', JSON.stringify(products));
  closeProductModal();
  renderProducts();
  updateDashboard();
}

function editProduct(id) {
  const product = products.find(p => p.id === id);
  if (product) openProductModal(product);
}

function renderOrders() {
  const search = document.getElementById('orderSearch').value.toLowerCase();
  const status = document.getElementById('orderStatusFilter').value;

  const filtered = orders.filter(o => {
    const matchSearch = o.customer.toLowerCase().includes(search) || o.id.toLowerCase().includes(search);
    const matchStatus = status === 'all' || o.status === status;
    return matchSearch && matchStatus;
  });

  const tbody = document.getElementById('ordersTable');
  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="empty-state">No orders found</td></tr>';
    return;
  }

  tbody.innerHTML = filtered.map(o => `
    <tr>
      <td>${o.id}</td>
      <td>${o.customer}<br><small style="color:var(--muted)">${o.email}</small></td>
      <td>${o.items.map(i => `${i.name} x${i.qty}`).join(', ')}</td>
      <td>$${o.total}</td>
      <td><span class="status-badge status-${o.status.toLowerCase().replace(' ', '')}">${o.status}</span></td>
      <td>${o.date}</td>
      <td>
        <button class="action-btn" onclick="openOrderModal('${o.id}')">Update</button>
      </td>
    </tr>
  `).join('');
}

function filterOrders() {
  renderOrders();
}

function openOrderModal(orderId) {
  const order = orders.find(o => o.id === orderId);
  if (order) {
    document.getElementById('orderModal').classList.add('active');
    document.getElementById('orderModalId').value = orderId;
    document.getElementById('orderStatus').value = order.status;
  }
}

function closeOrderModal() {
  document.getElementById('orderModal').classList.remove('active');
}

function saveOrderStatus() {
  const id = document.getElementById('orderModalId').value;
  const status = document.getElementById('orderStatus').value;
  const idx = orders.findIndex(o => o.id === id);
  if (idx !== -1) {
    orders[idx].status = status;
    saveOrders();
    closeOrderModal();
    renderOrders();
    updateDashboard();
  }
}

document.addEventListener('DOMContentLoaded', initAdmin);