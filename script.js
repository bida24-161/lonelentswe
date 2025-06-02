document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobile');
    const navbar = document.getElementById('navbar');
    const closeButton = document.getElementById('close');
    const barButton = document.getElementById('bar');

    if (barButton) {
        barButton.addEventListener('click', () => {
            navbar.classList.add('active');
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', () => {
            navbar.classList.remove('active');
        });
    }

    // Modal functionality for footer links (unchanged from your existing HTML)
    const modalContainer = document.getElementById('modal-container');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeButtonModal = document.querySelector('.close-button');

    function openModal(title, content) {
        modalTitle.textContent = title;
        modalBody.innerHTML = content;
        modalContainer.style.display = 'flex';
    }

    closeButtonModal.addEventListener('click', () => {
        modalContainer.style.display = 'none';
    });

    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
            modalContainer.style.display = 'none';
        }
    });

    document.getElementById('aboutUsLink').addEventListener('click', (e) => {
        e.preventDefault();
        openModal('About Us', '<p>Welcome to LONE\'s MINI BRANDHOUSE! We are dedicated to providing the latest trends and high-quality products to our valued customers. Our mission is to make fashion accessible and affordable for everyone, especially students.</p>');
    });

    document.getElementById('deliveryInfoLink').addEventListener('click', (e) => {
        e.preventDefault();
        openModal('Delivery Information', '<p>We offer fast and reliable delivery services. Standard delivery typically takes 3-5 business days. Express options are available at checkout. Please see our FAQ for more details on international shipping.</p>');
    });

    document.getElementById('privacyPolicyLink').addEventListener('click', (e) => {
        e.preventDefault();
        openModal('Privacy Policy', '<p>Your privacy is important to us. This policy explains how we collect, use, and protect your personal data. We are committed to ensuring your information is secure and used responsibly.</p>');
    });

    document.getElementById('termsConditionsLink').addEventListener('click', (e) => {
        e.preventDefault();
        openModal('Terms & Conditions', '<p>By using our website and services, you agree to abide by our terms and conditions. These include guidelines on purchases, returns, intellectual property, and user conduct. Please read them carefully.</p>');
    });

    document.getElementById('contactUsLink').addEventListener('click', (e) => {
        e.preventDefault();
        openModal('Contact Us', '<p>Have questions? Reach out to us at support@lonebrandhouse.com or call us at +267 74697684. Our customer service team is available Monday to Saturday, 10:00 - 18:00.</p>');
    });

    document.getElementById('signInLink').addEventListener('click', (e) => {
        e.preventDefault();
        openModal('Sign In', '<p>Sign in to your account to manage your orders, track shipments, and access exclusive offers. New customers can register quickly and easily.</p>');
    });

    document.getElementById('myWaitlistLink').addEventListener('click', (e) => {
        e.preventDefault();
        openModal('My Waitlist', '<p>View items you\'re waiting for. We\'ll notify you as soon as they\'re back in stock!</p>');
    });

    document.getElementById('trackMyOrderLink').addEventListener('click', (e) => {
        e.preventDefault();
        openModal('Track My Order', '<p>Enter your order number to track your shipment. You\'ll receive real-time updates on your delivery status.</p>');
    });

    document.getElementById('helpLink').addEventListener('click', (e) => {
        e.preventDefault();
        openModal('Help', '<p>Find answers to frequently asked questions, troubleshooting tips, and guides on how to use our website. Our comprehensive help section is designed to assist you with any queries.</p>');
    });


    // --- Shopping Cart Logic ---

    const cartCountElement = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Function to get cart items from localStorage
    function getCartItems() {
        return JSON.parse(localStorage.getItem('cartItems')) || [];
    }

    // Function to save cart items to localStorage
    function saveCartItems(items) {
        localStorage.setItem('cartItems', JSON.stringify(items));
    }

    // Function to update the cart count display
    function updateCartCount() {
        const cartItems = getCartItems();
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        if (totalItems > 0) {
            cartCountElement.textContent = totalItems;
            cartCountElement.style.display = 'inline-block'; // Show the count
        } else {
            cartCountElement.style.display = 'none'; // Hide if no items
        }
    }

    // Add event listener to each "Add to Cart" button
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior

            const productId = button.dataset.productId;
            const productName = button.dataset.productName;
            const productPrice = parseFloat(button.dataset.productPrice);
            const productImageUrl = button.dataset.productImageUrl;

            let cartItems = getCartItems();
            const existingItemIndex = cartItems.findIndex(item => item.id === productId);

            if (existingItemIndex > -1) {
                // If item exists, increase its quantity
                cartItems[existingItemIndex].quantity += 1;
            } else {
                // If item does not exist, add it to the cart
                cartItems.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    imageUrl: productImageUrl,
                    quantity: 1
                });
            }

            saveCartItems(cartItems);
            updateCartCount();
            alert(`${productName} has been added to your cart!`);
        });
    });

    // Initialize cart count on page load
    updateCartCount();
});
