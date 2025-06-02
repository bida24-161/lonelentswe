// app.js - Combined JavaScript for LONE's MINI BRANDHOUSE

document.addEventListener('DOMContentLoaded', () => {

    // --- GLOBAL FUNCTIONS & ELEMENTS ---

    // Function to update the cart count in the header
    const updateHeaderCartCount = () => {
        const cartCountSpan = document.querySelector('.cart-count');
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cartCountSpan) {
            if (currentCart.length > 0) {
                cartCountSpan.style.display = 'inline-block';
                cartCountSpan.textContent = currentCart.length;
            } else {
                cartCountSpan.style.display = 'none';
                cartCountSpan.textContent = '';
            }
        }
    };

    // Initial call to update cart count on page load for all pages
    updateHeaderCartCount();

    // Mobile Navbar functionality
    const bar = document.getElementById('bar');
    const close = document.getElementById('close');
    const nav = document.getElementById('navbar');

    if (bar) {
        bar.addEventListener('click', () => {
            nav.classList.add('active');
        });
    }
    if (close) {
        close.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    }

    // --- ADD TO CART FUNCTIONALITY (for product listing pages) ---
    // This section will run on index.html and shop.html

    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior

            const productId = button.dataset.productId;
            const productName = button.dataset.productName;
            const productPrice = parseFloat(button.dataset.productPrice);
            const productImageUrl = button.dataset.productImageUrl;

            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    quantity: 1,
                    imageUrl: productImageUrl
                });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${productName} added to cart!`);
            updateHeaderCartCount(); // Update the cart icon counter
        });
    });

    // --- FOOTER POP-UP MODALS FUNCTIONALITY ---
    // This section will run on all pages that include the modal elements

    const modalContainer = document.getElementById('modal-container');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeButton = document.querySelector('.close-button');

    if (modalContainer && modalTitle && modalBody && closeButton) {
        const openModal = (title, content) => {
            modalTitle.textContent = title;
            modalBody.innerHTML = content;
            modalContainer.style.display = 'flex';
        };

        closeButton.addEventListener('click', () => {
            modalContainer.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === modalContainer) {
                modalContainer.style.display = 'none';
            }
        });

        // Attach click listeners to footer links using optional chaining for robustness
        document.getElementById('deliveryInfoLink')?.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('Delivery Information',
                '<p><strong>Standard Delivery:</strong> 3-5 business days. Free for orders over $100.</p>' +
                '<p><strong>Express Delivery:</strong> 1-2 business days. Flat rate of $15.</p>' +
                '<p>We ship internationally. International shipping times and costs vary by destination.</p>'
            );
        });

        document.getElementById('privacyPolicyLink')?.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('Privacy Policy',
                '<p>Your privacy is important to us. This policy explains how we collect, use, and protect your personal data.</p>' +
                '<ul>' +
                '<li>We collect information when you register, place an order, or subscribe to our newsletter.</li>' +
                '<li>We use your information to process transactions, send periodic emails, and improve our services.</li>' +
                '<li>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.</li>' +
                '</ul>' +
                '<p>For more details, please refer to our full privacy policy document.</p>'
            );
        });

        document.getElementById('termsConditionsLink')?.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('Terms & Conditions',
                '<p>By using our website and services, you agree to comply with and be bound by the following terms and conditions:</p>' +
                '<ul>' +
                '<li>All content on this site is for your general information and use only. It is subject to change without notice.</li>' +
                '<li>Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offense.</li>' +
                '<li>Your use of any information or materials on this website is entirely at your own risk.</li>' +
                '</ul>' +
                '<p>Please read our full terms and conditions carefully before proceeding.</p>'
            );
        });

        document.getElementById('contactUsLink')?.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('Contact Us',
                '<p>Have questions? Reach out to us!</p>' +
                '<p><strong>Email:</strong> support@lonebrandhouse.com</p>' +
                '<p><strong>Phone:</strong> +267 74697684</p>' +
                '<p><strong>Address:</strong> 1084 Mogoma Rd, Gaborone</p>' +
                '<p><strong>Business Hours:</strong> Monday - Saturday, 10:00 AM - 6:00 PM</p>'
            );
        });

        document.getElementById('aboutUsLink')?.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('About Us', '<p>LONE\'s MINI BRANDHOUSE is dedicated to bringing you the latest trends at affordable prices.</p><p>We are passionate about fashion and customer satisfaction.</p>');
        });
        document.getElementById('signInLink')?.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('Sign In', '<p>Sign In functionality coming soon!</p>');
        });
        document.getElementById('myWaitlistLink')?.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('My Waitlist', '<p>Your waitlist is empty. Check back for exciting new arrivals!</p>');
        });
        document.getElementById('trackMyOrderLink')?.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('Track My Order', '<p>Enter your order number to track your package.</p><input type="text" placeholder="Order Number" style="width:100%; padding:8px; margin-top:10px;"/><button class="normal" style="margin-top:10px;">Track</button>');
        });
        document.getElementById('helpLink')?.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('Help', '<p>For any assistance, please refer to our FAQ page or contact customer support.</p><p>Email: help@lonebrandhouse.com</p>');
        });
    }

    // --- CART PAGE FUNCTIONALITY ---
    // This section will run ONLY on cart.html (or pages with cart elements)

    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartSubtotalElement = document.getElementById('cart-subtotal');
    const cartTotalElement = document.getElementById('cart-total');

    // Check if cart-specific elements exist on the current page before running cart logic
    if (cartItemsContainer && cartSubtotalElement && cartTotalElement) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Function to save cart to localStorage and re-render the display
        const saveCart = () => {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay(); // Re-render cart items and totals
            updateHeaderCartCount(); // Update the header cart count as well
        };

        // Function to calculate and update cart totals
        const calculateCartTotals = () => {
            let subtotal = 0;
            cart.forEach(item => {
                subtotal += item.price * item.quantity;
            });

            cartSubtotalElement.textContent = `$${subtotal.toFixed(2)}`;
            cartTotalElement.textContent = `$${subtotal.toFixed(2)}`; // Assuming free shipping for now
        };

        // Function to render cart items in the table
        const renderCartItems = () => {
            cartItemsContainer.innerHTML = ''; // Clear existing items

            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px;">Your cart is empty. Go to <a href="shop.html">Shop</a> to add items.</td></tr>';
            } else {
                cart.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><a href="#" class="remove-item" data-product-id="${item.id}"><i class="far fa-times-circle"></i></a></td>
                        <td><img src="${item.imageUrl}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover;"></td>
                        <td>${item.name}</td>
                        <td>$${item.price.toFixed(2)}</td>
                        <td><input type="number" value="${item.quantity}" min="1" class="item-quantity" data-product-id="${item.id}"></td>
                        <td>$${(item.price * item.quantity).toFixed(2)}</td>
                    `;
                    cartItemsContainer.appendChild(row);
                });
            }
        };

        // Function to handle removing an item
        const removeItem = (productId) => {
            cart = cart.filter(item => item.id !== productId);
            saveCart(); // Save the updated cart and re-render
        };

        // Function to handle quantity changes
        const updateQuantity = (productId, newQuantity) => {
            const item = cart.find(item => item.id === productId);
            if (item) {
                const quantity = parseInt(newQuantity);
                // If quantity is invalid or zero/negative, remove the item
                if (isNaN(quantity) || quantity < 1) {
                    removeItem(productId);
                } else {
                    item.quantity = quantity;
                    saveCart(); // Save and re-render
                }
            }
        };

        // Main function to update the entire cart display
        const updateCartDisplay = () => {
            renderCartItems();
            calculateCartTotals();
        };

        // Event listener for remove buttons (delegated to container)
        cartItemsContainer.addEventListener('click', (e) => {
            const removeItemBtn = e.target.closest('.remove-item');
            if (removeItemBtn) {
                e.preventDefault();
                const productId = removeItemBtn.dataset.productId;
                removeItem(productId);
            }
        });

        // Event listener for quantity input changes (delegated to container)
        cartItemsContainer.addEventListener('change', (e) => {
            if (e.target.classList.contains('item-quantity')) {
                const productId = e.target.dataset.productId;
                const newQuantity = e.target.value;
                updateQuantity(productId, newQuantity);
            }
        });

        // Initial display of cart items when the cart page loads
        updateCartDisplay();
    }
});
