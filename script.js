// script.js

// Make updateHeaderCartCount globally accessible or ensure it's called consistently
const updateHeaderCartCount = () => {
    const cartCountSpan = document.querySelector('.cart-count');
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cartCountSpan) { // Check if the element exists
        if (currentCart.length > 0) {
            cartCountSpan.style.display = 'inline-block';
            cartCountSpan.textContent = currentCart.length;
        } else {
            cartCountSpan.style.display = 'none';
            cartCountSpan.textContent = '';
        }
    }
};

// Call it once on page load
document.addEventListener('DOMContentLoaded', updateHeaderCartCount);


const bar = document.getElementById('bar');
const close = document.getElementById('close'); // You'll need to add id="close" to your mobile close icon in HTML
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

// Add to Cart Functionality (for index.html and shop.html)
const addToCartButtons = document.querySelectorAll('.add-to-cart');
// Ensure cart is managed consistently by the global function
// No need to declare 'cart' here if updateHeaderCartCount handles retrieval
// let cart = JSON.parse(localStorage.getItem('cart')) || []; // No longer needed here

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior

        const productId = button.dataset.productId;
        const productName = button.dataset.productName;
        const productPrice = parseFloat(button.dataset.productPrice);

        let cart = JSON.parse(localStorage.getItem('cart')) || []; // Get latest cart data

        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${productName} added to cart!`); // Simple feedback
        updateHeaderCartCount(); // Update the cart icon counter
    });
});

// Footer Pop-up Functionality (for index.html)
// Assuming modal elements and their IDs are present in index.html (and potentially other pages)
const modalContainer = document.getElementById('modal-container');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const closeButton = document.querySelector('.close-button'); // Ensure this selector is correct

// Ensure modal elements exist before trying to add listeners
if (modalContainer && modalTitle && modalBody && closeButton) {
    function openModal(title, content) {
        modalTitle.textContent = title;
        modalBody.innerHTML = content;
        modalContainer.style.display = 'flex'; // Use flex to center
    }

    closeButton.addEventListener('click', () => {
        modalContainer.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modalContainer) {
            modalContainer.style.display = 'none';
        }
    });

    // Attach click listeners to footer links
    const deliveryInfoLink = document.getElementById('deliveryInfoLink');
    const privacyPolicyLink = document.getElementById('privacyPolicyLink');
    const termsConditionsLink = document.getElementById('termsConditionsLink');
    const contactUsLink = document.getElementById('contactUsLink');
    const aboutUsLink = document.querySelector('footer .col a[href="#"][textContent="About us"]');
    const signInLink = document.querySelector('footer .col a[href="#"][textContent="Sing In"]');


    if (deliveryInfoLink) {
        deliveryInfoLink.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('Delivery Information',
                '<p><strong>Standard Delivery:</strong> 3-5 business days. Free for orders over $100.</p>' +
                '<p><strong>Express Delivery:</strong> 1-2 business days. Flat rate of $15.</p>' +
                '<p>We ship internationally. International shipping times and costs vary by destination.</p>'
            );
        });
    }

    if (privacyPolicyLink) {
        privacyPolicyLink.addEventListener('click', (e) => {
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
    }

    if (termsConditionsLink) {
        termsConditionsLink.addEventListener('click', (e) => {
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
    }

    if (contactUsLink) {
        contactUsLink.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('Contact Us',
                '<p>Have questions? Reach out to us!</p>' +
                '<p><strong>Email:</strong> support@lonebrandhouse.com</p>' +
                '<p><strong>Phone:</strong> +267 746976847</p>' +
                '<p><strong>Address:</strong> 1084 Mogoma Rd, Gaborone</p>' +
                '<p><strong>Business Hours:</strong> Monday - Saturday, 10:00 AM - 6:00 PM</p>'
            );
        });
    }

    if (aboutUsLink) {
        aboutUsLink.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('About Us', '<p>LONE\'s MINI BRANDHOUSE is dedicated to bringing you the latest trends at affordable prices.</p><p>Learn more about our mission and values on our <a href="about.html">About Us page</a>.</p>');
        });
    }

    if (signInLink) {
        signInLink.addEventListener('click', (e) => {
            e.preventDefault();
            openModal('Sign In', '<p>Sign in to manage your account, view orders, and more.</p><p>This is a placeholder for your sign-in form or link to a dedicated sign-in page.</p>');
        });
    }
}
