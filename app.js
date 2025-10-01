const STATE = {
    currentUser: null,
    currentPage: 'login',
    cart: [],
    products: [],
    searchQuery: '',
    activeCategory: 'all',
};

const PRODUCTS_DATA = [
    { id: 1, name: 'Paracetamol 500mg', category: 'medicines', price: 5.99, description: 'Pain relief and fever reducer', image: 'https://assets.sayacare.in/api/images/product_image/large_image/23/74/Paracetamol-500-mg-Tablet_1.webp' },
    { id: 2, name: 'Ibuprofen 400mg', category: 'medicines', price: 7.99, description: 'Anti-inflammatory medication', image: 'https://5.imimg.com/data5/SELLER/Default/2023/8/338103452/MQ/FF/QW/91766502/whatsapp-image-2023-08-19-at-17-09-37-500x500.jpeg' },
    { id: 3, name: 'Amoxicillin 250mg', category: 'medicines', price: 12.99, description: 'Antibiotic for infections', image: 'https://assets.sayacare.in/api/images/product_image/large_image/44/44/Amoxicillin-250-mg-Capsule_1.webp' },
    { id: 4, name: 'Aspirin 100mg', category: 'medicines', price: 4.99, description: 'Blood thinner and pain relief', image: 'https://5.imimg.com/data5/SELLER/PDFImage/2024/5/419969494/YB/FR/DX/11156742/aspirin-tablets-100-mg.png' },
    { id: 5, name: 'Vitamin D3 1000IU', category: 'vitamins', price: 15.99, description: 'Supports bone health', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtz_6hKO_3tClHYYRJFjDGuX_ThZqzwsB9Zg&s' },
    { id: 6, name: 'Vitamin C 1000mg', category: 'vitamins', price: 9.99, description: 'Immune system support', image: 'https://onemg.gumlet.io/l_watermark_346,w_480,h_480/a_ignore,w_480,h_480,c_fit,q_auto,f_auto/e50b3e27f77f4be1a044fcf0a2ae9577.jpg' },
    { id: 7, name: 'Multivitamin Complex', category: 'vitamins', price: 19.99, description: 'Complete daily nutrition', image:  'https://supplemart.in/cdn/shop/files/pixelcut-export-2024-10-25T173443.176.png?v=1735538403' },
    { id: 8, name: 'Omega-3 Fish Oil', category: 'vitamins', price: 22.99, description: 'Heart and brain health', image: 'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now01650/l/38.jpg' },
    { id: 9, name: 'Protein Powder', category: 'wellness', price: 34.99, description: 'Muscle building supplement', image: 'https://img8.hkrtcdn.com/39078/prd_3907787-MuscleBlaze-Biozyme-Performance-Whey-4.4-lb-Rich-Chocolate_o.jpg' }, 
    { id: 10, name: 'Probiotics', category: 'wellness', price: 24.99, description: 'Digestive health support', image:  'https://mycf.in/cdn/shop/files/B07J2KN2VD.MAIN.jpg?v=1752314618' },
    { id: 11, name: 'Green Tea Extract', category: 'wellness', price: 16.99, description: 'Antioxidant supplement', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ3OTzEeXIiKLdvnSwEvgStLMFWsrY34RVzw&s' },
    { id: 12, name: 'Collagen Peptides', category: 'wellness', price: 29.99, description: 'Skin and joint health', image: 'https://m.media-amazon.com/images/I/513W9RzXnUL._UF1000,1000_QL80_.jpg' },
    { id: 13, name: 'Cough Syrup', category: 'medicines', price: 8.99, description: 'Relieves cough symptoms', image:  'https://4.imimg.com/data4/TE/US/GLADMIN-3513191/qqq3-500x500.jpg' },
    { id: 14, name: 'Antihistamine', category: 'medicines', price: 11.99, description: 'Allergy relief medication', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSprLtfr5H7Oi9gZt-uADM3YA7BkAqeGVQfUQ&s' },
    { id: 15, name: 'B-Complex Vitamins', category: 'vitamins', price: 13.99, description: 'Energy and metabolism', image: 'https://m.media-amazon.com/images/I/71qAIjppAmL._UF1000,1000_QL80_.jpg' },
    { id: 16, name: 'Calcium + Magnesium', category: 'vitamins', price: 17.99, description: 'Bone strength formula', image:  'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/now/now01252/y/126.jpg' },
];

function init() {
    loadFromStorage();
    STATE.products = PRODUCTS_DATA;
    setupEventListeners();
    updateUI();
}

function loadFromStorage() {
    const storedUser = localStorage.getItem('currentUser');
    const storedCart = localStorage.getItem('cart');

    if (storedUser) {
        STATE.currentUser = JSON.parse(storedUser);
        STATE.currentPage = 'home';
    }

    if (storedCart) {
        STATE.cart = JSON.parse(storedCart);
    }
}

function saveToStorage() {
    if (STATE.currentUser) {
        localStorage.setItem('currentUser', JSON.stringify(STATE.currentUser));
    }
    localStorage.setItem('cart', JSON.stringify(STATE.cart));
}

function setupEventListeners() {
    document.getElementById('profileBtn').addEventListener('click', handleProfileClick);
    document.getElementById('cartBtn').addEventListener('click', () => navigate('cart'));
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    document.getElementById('searchBtn').addEventListener('click', handleSearch);
    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });

    document.querySelector('.nav-logo').addEventListener('click', () => {
        if (STATE.currentUser) navigate('home');
    });
}

function handleProfileClick() {
    if (STATE.currentUser) {
        navigate('profile');
    } else {
        navigate('login');
    }
}

function handleLogout() {
    STATE.currentUser = null;
    STATE.cart = [];
    localStorage.removeItem('currentUser');
    localStorage.removeItem('cart');
    navigate('login');
}

function handleSearch() {
    const query = document.getElementById('searchInput').value.trim();
    STATE.searchQuery = query;
    navigate('products');
}

function navigate(page) {
    STATE.currentPage = page;
    updateUI();
}

function updateUI() {
    updateNavbar();
    renderPage();
}

function updateNavbar() {
    const userNameDisplay = document.getElementById('userNameDisplay');
    const logoutBtn = document.getElementById('logoutBtn');
    const cartCount = document.getElementById('cartCount');

    if (STATE.currentUser) {
        userNameDisplay.textContent = STATE.currentUser.name;
        logoutBtn.style.display = 'block';
    } else {
        userNameDisplay.textContent = 'Login';
        logoutBtn.style.display = 'none';
    }

    cartCount.textContent = STATE.cart.reduce((sum, item) => sum + item.quantity, 0);
}

function renderPage() {
    const mainContent = document.getElementById('mainContent');

    switch (STATE.currentPage) {
        case 'login':
            mainContent.innerHTML = renderLogin();
            attachLoginListeners();
            break;
        case 'signup':
            mainContent.innerHTML = renderSignup();
            attachSignupListeners();
            break;
        case 'home':
            mainContent.innerHTML = renderHome();
            attachHomeListeners();
            break;
        case 'products':
            mainContent.innerHTML = renderProducts();
            attachProductsListeners();
            break;
        case 'cart':
            mainContent.innerHTML = renderCart();
            attachCartListeners();
            break;
        case 'checkout':
            mainContent.innerHTML = renderCheckout();
            attachCheckoutListeners();
            break;
        case 'profile':
            mainContent.innerHTML = renderProfile();
            attachProfileListeners();
            break;
        case 'success':
            mainContent.innerHTML = renderSuccess();
            attachSuccessListeners();
            break;
        default:
            mainContent.innerHTML = renderLogin();
    }
}

function renderLogin() {
    return `
        <div class="auth-container">
            <div class="auth-card">
                <div class="auth-header">
                    <h1>Welcome to MediCart</h1>
                    <p>Login to your account to continue</p>
                </div>
                <form id="loginForm">
                    <div class="form-group">
                        <label for="loginEmail">Email Address</label>
                        <input type="email" id="loginEmail" required placeholder="Enter your email">
                    </div>
                    <div class="form-group">
                        <label for="loginPassword">Password</label>
                        <input type="password" id="loginPassword" required placeholder="Enter your password">
                    </div>
                    <div id="loginError" class="form-error"></div>
                    <button type="submit" class="btn btn-primary">Login</button>
                    <button type="button" class="btn btn-secondary" id="goToSignup">Create New Account</button>
                </form>
                <div class="auth-footer">
                    <p>New to MediCart? <a href="#" id="signupLink">Sign up now</a></p>
                </div>
            </div>
        </div>
    `;
}

function attachLoginListeners() {
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('goToSignup').addEventListener('click', () => navigate('signup'));
    document.getElementById('signupLink').addEventListener('click', (e) => {
        e.preventDefault();
        navigate('signup');
    });
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const errorDiv = document.getElementById('loginError');

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        STATE.currentUser = user;
        saveToStorage();
        navigate('home');
    } else {
        errorDiv.textContent = 'Invalid email or password';
    }
}

function renderSignup() {
    return `
        <div class="auth-container">
            <div class="auth-card">
                <div class="auth-header">
                    <h1>Create Account</h1>
                    <p>Join MediCart for a better healthcare experience</p>
                </div>
                <form id="signupForm">
                    <div class="form-group">
                        <label for="signupName">Full Name</label>
                        <input type="text" id="signupName" required placeholder="Enter your full name">
                    </div>
                    <div class="form-group">
                        <label for="signupEmail">Email Address</label>
                        <input type="email" id="signupEmail" required placeholder="Enter your email">
                    </div>
                    <div class="form-group">
                        <label for="signupPassword">Password</label>
                        <input type="password" id="signupPassword" required placeholder="Create a password" minlength="6">
                    </div>
                    <div class="form-group">
                        <label for="signupPhone">Phone Number</label>
                        <input type="tel" id="signupPhone" required placeholder="Enter your phone number">
                    </div>
                    <div id="signupError" class="form-error"></div>
                    <button type="submit" class="btn btn-primary">Create Account</button>
                    <button type="button" class="btn btn-secondary" id="goToLogin">Already have an account</button>
                </form>
            </div>
        </div>
    `;
}

function attachSignupListeners() {
    document.getElementById('signupForm').addEventListener('submit', handleSignup);
    document.getElementById('goToLogin').addEventListener('click', () => navigate('login'));
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const phone = document.getElementById('signupPhone').value;
    const errorDiv = document.getElementById('signupError');

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.find(u => u.email === email)) {
        errorDiv.textContent = 'Email already registered';
        return;
    }

    const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        phone,
        address: '',
        orders: []
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    STATE.currentUser = newUser;
    saveToStorage();
    navigate('home');
}

function renderHome() {
    return `
        <div class="hero">
            <h1>Your Trusted Online Pharmacy</h1>
            <p>Quality medicines and healthcare products delivered to your doorstep</p>
        </div>

        <div class="categories">
            <div class="category-card" data-category="medicines">
                <div class="category-icon">💊</div>
                <h3>Medicines</h3>
                <p>Prescription and OTC medications</p>
            </div>
            <div class="category-card" data-category="vitamins">
                <div class="category-icon">🌟</div>
                <h3>Vitamins</h3>
                <p>Essential vitamins and minerals</p>
            </div>
            <div class="category-card" data-category="wellness">
                <div class="category-icon">💪</div>
                <h3>Wellness Products</h3>
                <p>Health supplements and more</p>
            </div>
        </div>

        <div class="section-header">
            <h2>Featured Products</h2>
        </div>
        <div class="products-grid">
            ${STATE.products.slice(0, 8).map(product => renderProductCard(product)).join('')}
        </div>

        <button class="btn btn-primary" id="viewAllBtn" style="max-width: 300px; margin: 2rem auto; display: block;">
            View All Products
        </button>
    `;
}

function attachHomeListeners() {
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            STATE.activeCategory = card.dataset.category;
            navigate('products');
        });
    });

    document.getElementById('viewAllBtn').addEventListener('click', () => {
        STATE.activeCategory = 'all';
        navigate('products');
    });

    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.dataset.productId);
            addToCart(productId);
        });
    });
}

function renderProducts() {
    let filteredProducts = STATE.products;

    if (STATE.activeCategory !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === STATE.activeCategory);
    }

    if (STATE.searchQuery) {
        const query = STATE.searchQuery.toLowerCase();
        filteredProducts = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
        );
    }

    return `
        <div class="section-header">
            <h2>Browse Products</h2>
        </div>

        <div class="filter-bar">
            <button class="filter-btn ${STATE.activeCategory === 'all' ? 'active' : ''}" data-category="all">All Products</button>
            <button class="filter-btn ${STATE.activeCategory === 'medicines' ? 'active' : ''}" data-category="medicines">Medicines</button>
            <button class="filter-btn ${STATE.activeCategory === 'vitamins' ? 'active' : ''}" data-category="vitamins">Vitamins</button>
            <button class="filter-btn ${STATE.activeCategory === 'wellness' ? 'active' : ''}" data-category="wellness">Wellness</button>
        </div>

        ${filteredProducts.length === 0 ? `
            <div class="cart-empty">
                <div class="cart-empty-icon">🔍</div>
                <h2>No products found</h2>
                <p>Try adjusting your search or filters</p>
            </div>
        ` : `
            <div class="products-grid">
                ${filteredProducts.map(product => renderProductCard(product)).join('')}
            </div>
        `}
    `;
}

function attachProductsListeners() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            STATE.activeCategory = btn.dataset.category;
            STATE.searchQuery = '';
            document.getElementById('searchInput').value = '';
            navigate('products');
        });
    });

    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.dataset.productId);
            addToCart(productId);
        });
    });
}

function renderProductCard(product) {
    return `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" style="width:100px;height:100px;object-fit:cover;border-radius:8px;">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-footer">
                    <div class="product-price">&#8377;${product.price.toFixed(2)}</div>
                    <button class="btn-add-cart" data-product-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
}

function addToCart(productId) {
    if (!STATE.currentUser) {
        navigate('login');
        return;
    }

    const product = STATE.products.find(p => p.id === productId);
    const cartItem = STATE.cart.find(item => item.productId === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        STATE.cart.push({
            productId,
            quantity: 1,
            product
        });
    }

    saveToStorage();
    updateUI();
}

function renderCart() {
    if (STATE.cart.length === 0) {
        return `
            <div class="cart-container">
                <div class="cart-empty">
                    <div class="cart-empty-icon">🛒</div>
                    <h2>Your cart is empty</h2>
                    <p>Add some products to get started!</p>
                    <button class="btn btn-primary" id="continueShopping" style="max-width: 300px; margin: 2rem auto;">
                        Continue Shopping
                    </button>
                </div>
            </div>
        `;
    }

    const subtotal = STATE.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    return `
        <div class="cart-container">
            <h2 style="margin-bottom: 2rem;">Shopping Cart</h2>
            <div class="cart-items">
                ${STATE.cart.map(item => renderCartItem(item)).join('')}
            </div>

            <div class="cart-summary">
                <div class="summary-row">
                    <span>Subtotal:</span>
                    <span>&#8377;${subtotal.toFixed(2)}</span>
                </div>
                <div class="summary-row">
                    <span>Tax (8%):</span>
                    <span>&#8377;${tax.toFixed(2)}</span>
                </div>
                <div class="summary-row summary-total">
                    <span>Total:</span>
                    <span>&#8377;${total.toFixed(2)}</span>
                </div>
                <button class="btn btn-primary" id="proceedCheckout">Proceed to Checkout</button>
            </div>
        </div>
    `;
}

function attachCartListeners() {
    const continueBtn = document.getElementById('continueShopping');
    if (continueBtn) {
        continueBtn.addEventListener('click', () => navigate('home'));
    }

    const checkoutBtn = document.getElementById('proceedCheckout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => navigate('checkout'));
    }

    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.dataset.productId);
            const action = btn.dataset.action;
            updateQuantity(productId, action);
        });
    });

    document.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.dataset.productId);
            removeFromCart(productId);
        });
    });
}

function renderCartItem(item) {
    return `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.product.image}" alt="${item.product.name}" style="width:60px;height:60px;object-fit:cover;border-radius:8px;">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.product.name}</div>
                <div class="cart-item-category">${item.product.category}</div>
                <div class="cart-item-price">&#8377;${item.product.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-control">
                    <button class="quantity-btn" data-product-id="${item.productId}" data-action="decrease">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn" data-product-id="${item.productId}" data-action="increase">+</button>
                </div>
                <button class="btn-remove" data-product-id="${item.productId}">Remove</button>
            </div>
        </div>
    `;
}

function updateQuantity(productId, action) {
    const cartItem = STATE.cart.find(item => item.productId === productId);

    if (action === 'increase') {
        cartItem.quantity++;
    } else if (action === 'decrease') {
        cartItem.quantity--;
        if (cartItem.quantity === 0) {
            removeFromCart(productId);
            return;
        }
    }

    saveToStorage();
    updateUI();
}

function removeFromCart(productId) {
    STATE.cart = STATE.cart.filter(item => item.productId !== productId);
    saveToStorage();
    updateUI();
}

function renderCheckout() {
    const subtotal = STATE.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    return `
        <div class="checkout-container">
            <div class="checkout-form">
                <h2>Delivery Information</h2>
                <form id="checkoutForm">
                    <div class="form-group">
                        <label for="checkoutName">Full Name</label>
                        <input type="text" id="checkoutName" required value="${STATE.currentUser.name}">
                    </div>
                    <div class="form-group">
                        <label for="checkoutPhone">Phone Number</label>
                        <input type="tel" id="checkoutPhone" required value="${STATE.currentUser.phone}">
                    </div>
                    <div class="form-group">
                        <label for="checkoutAddress">Delivery Address</label>
                        <input type="text" id="checkoutAddress" required value="${STATE.currentUser.address || ''}" placeholder="Enter delivery address">
                    </div>
                    <div class="form-group">
                        <label for="checkoutCity">City</label>
                        <input type="text" id="checkoutCity" required placeholder="Enter city">
                    </div>
                    <div class="form-group">
                        <label for="checkoutZip">ZIP Code</label>
                        <input type="text" id="checkoutZip" required placeholder="Enter ZIP code">
                    </div>
                    <button type="submit" class="btn btn-primary">Complete Order</button>
                </form>
            </div>

            <div class="order-summary">
                <h2>Order Summary</h2>
                ${STATE.cart.map(item => `
                    <div class="order-item">
                        <div class="order-item-details">
                            <div class="order-item-name">${item.product.name}</div>
                            <div class="order-item-qty">Qty: ${item.quantity} × &#8377;${item.product.price.toFixed(2)}</div>
                        </div>
                        <div>&#8377;${(item.product.price * item.quantity).toFixed(2)}</div>
                    </div>
                `).join('')}

                <div class="cart-summary" style="margin-top: 1rem; padding: 1rem;">
                    <div class="summary-row">
                        <span>Subtotal:</span>
                        <span>&#8377;${subtotal.toFixed(2)}</span>
                    </div>
                    <div class="summary-row">
                        <span>Tax (8%):</span>
                        <span>&#8377;${tax.toFixed(2)}</span>
                    </div>
                    <div class="summary-row summary-total">
                        <span>Total:</span>
                        <span>&#8377;${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function attachCheckoutListeners() {
    document.getElementById('checkoutForm').addEventListener('submit', handleCheckout);
}

function handleCheckout(e) {
    e.preventDefault();

    const order = {
        id: 'ORD' + Date.now(),
        date: new Date().toISOString(),
        items: STATE.cart,
        total: STATE.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0) * 1.08,
        status: 'completed',
        deliveryInfo: {
            name: document.getElementById('checkoutName').value,
            phone: document.getElementById('checkoutPhone').value,
            address: document.getElementById('checkoutAddress').value,
            city: document.getElementById('checkoutCity').value,
            zip: document.getElementById('checkoutZip').value,
        }
    };

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === STATE.currentUser.id);
    if (userIndex !== -1) {
        users[userIndex].orders = users[userIndex].orders || [];
        users[userIndex].orders.push(order);
        users[userIndex].address = order.deliveryInfo.address;
        STATE.currentUser = users[userIndex];
        localStorage.setItem('users', JSON.stringify(users));
    }

    STATE.cart = [];
    saveToStorage();
    navigate('success');
}

function renderProfile() {
    const initials = STATE.currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase();

    return `
        <div class="profile-container">
            <div class="profile-header">
                <div class="profile-avatar">${initials}</div>
                <div class="profile-info">
                    <h2>${STATE.currentUser.name}</h2>
                    <p>${STATE.currentUser.email}</p>
                </div>
            </div>

            <div class="tabs">
                <button class="tab-btn active" data-tab="personal">Personal Info</button>
                <button class="tab-btn" data-tab="orders">Order History</button>
            </div>

            <div class="tab-content active" id="personal-tab">
                <form id="profileForm">
                    <div class="form-group">
                        <label for="profileName">Full Name</label>
                        <input type="text" id="profileName" value="${STATE.currentUser.name}">
                    </div>
                    <div class="form-group">
                        <label for="profileEmail">Email</label>
                        <input type="email" id="profileEmail" value="${STATE.currentUser.email}" disabled>
                    </div>
                    <div class="form-group">
                        <label for="profilePhone">Phone</label>
                        <input type="tel" id="profilePhone" value="${STATE.currentUser.phone}">
                    </div>
                    <div class="form-group">
                        <label for="profileAddress">Address</label>
                        <input type="text" id="profileAddress" value="${STATE.currentUser.address || ''}" placeholder="Enter your address">
                    </div>
                    <button type="submit" class="btn btn-primary">Update Profile</button>
                </form>
            </div>

            <div class="tab-content" id="orders-tab">
                ${STATE.currentUser.orders && STATE.currentUser.orders.length > 0 ?
                    STATE.currentUser.orders.map(order => renderOrderHistory(order)).join('') :
                    `<div class="cart-empty">
                        <div class="cart-empty-icon">📦</div>
                        <h2>No orders yet</h2>
                        <p>Your order history will appear here</p>
                    </div>`
                }
            </div>
        </div>
    `;
}

function attachProfileListeners() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            document.getElementById(btn.dataset.tab + '-tab').classList.add('active');
        });
    });

    document.getElementById('profileForm').addEventListener('submit', handleProfileUpdate);
}

function handleProfileUpdate(e) {
    e.preventDefault();

    const updatedData = {
        name: document.getElementById('profileName').value,
        phone: document.getElementById('profilePhone').value,
        address: document.getElementById('profileAddress').value,
    };

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === STATE.currentUser.id);

    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedData };
        STATE.currentUser = users[userIndex];
        localStorage.setItem('users', JSON.stringify(users));
        saveToStorage();

        alert('Profile updated successfully!');
    }
}

function renderOrderHistory(order) {
    const date = new Date(order.date).toLocaleDateString();

    return `
        <div class="order-history-item">
            <div class="order-header">
                <div>
                    <div class="order-id">Order #${order.id}</div>
                    <div class="order-date">${date}</div>
                </div>
                <span class="order-status ${order.status}">${order.status}</span>
            </div>
            <div>
                ${order.items.map(item => `
                    <div style="padding: 0.5rem 0; color: #666; display: flex; align-items: center;">
                        <img src="${item.product.image}" alt="${item.product.name}" style="width:32px;height:32px;object-fit:cover;border-radius:6px;margin-right:8px;">
                        ${item.product.name} × ${item.quantity}
                    </div>
                `).join('')}
            </div>
            <div style="font-weight: bold; color: var(--primary); margin-top: 1rem;">
                Total: &#8377;${order.total.toFixed(2)}
            </div>
        </div>
    `;
}

function renderSuccess() {
    return `
        <div class="success-container">
            <div class="success-icon">✓</div>
            <h1>Order Placed Successfully!</h1>
            <p>Thank you for your order. We'll send you a confirmation email shortly.</p>
            <button class="btn btn-primary" id="continueShoppingSuccess" style="max-width: 300px; margin: 0 auto;">
                Continue Shopping
            </button>
        </div>
    `;
}

function attachSuccessListeners() {
    document.getElementById('continueShoppingSuccess').addEventListener('click', () => {
        navigate('home');
    });
}

document.addEventListener('DOMContentLoaded', init);
