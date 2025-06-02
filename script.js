// script.js

document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCountSpan = document.querySelector('.cart-count');
    const mobileCartIcon = document.querySelector('#mobile a[href="cart.html"]');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to update the cart count display
    const updateCartCount = () => {
        if (cart.length > 0) {
            cartCountSpan.style.display = 'inline-block';
            cartCountSpan.textContent = cart.length;
            if (mobileCartIcon) {
                mobileCartIcon.querySelector('.fa-bag-shopping').setAttribute('data-count', cart.length);
            }
        } else {
            cartCountSpan.style.display = 'none';
            cartCountSpan.textContent = '';
            if (mobileCartIcon) {
                mobileCartIcon.querySelector('.fa-bag-shopping').removeAttribute('data-count');
            }
        }
    };

    // Add event listeners to "Add to Cart" buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior

            const productId = button.dataset.productId;
            const productName = button.dataset.productName;
            const productPrice = parseFloat(button.dataset.productPrice);

            const product = {
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1 // Start with 1 quantity
            };

            // Check if product already exists in cart
            const existingProductIndex = cart.findIndex(item => item.id === productId);

            if (existingProductIndex > -1) {
                // If product exists, increment its quantity
                cart[existingProductIndex].quantity += 1;
            } else {
                // If product doesn't exist, add it to cart
                cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to local storage
            updateCartCount(); // Update the cart count displayed on the page
            alert(`${productName} has been added to your cart!`); // Provide user feedback
        });
    });

    // Initial cart count update when the page loads
    updateCartCount();
});
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

// Add to Cart Functionality (for index.html)
const addToCartButtons = document.querySelectorAll('.add-to-cart');
let cart = JSON.parse(localStorage.getItem('cart')) || []; // Initialize cart from localStorage

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior

        const productId = button.dataset.productId;
        const productName = button.dataset.productName;
        const productPrice = parseFloat(button.dataset.productPrice); // Ensure price is a number

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
        // Optionally, update a cart icon counter here if you have one
    });
});

// Footer Pop-up Functionality (for index.html)
const modalContainer = document.getElementById('modal-container');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const closeButton = document.querySelector('.close-button');

function openModal(title, content) {
    modalTitle.textContent = title;
    modalBody.innerHTML = content;
    modalContainer.style.display = 'flex'; // Use flex to center
}

if (closeButton) {
    closeButton.addEventListener('click', () => {
        modalContainer.style.display = 'none';
    });
}

if (modalContainer) {
    window.addEventListener('click', (event) => {
        if (event.target == modalContainer) {
            modalContainer.style.display = 'none';
        }
    });
}


// Attach click listeners to footer links on index.html
const deliveryInfoLink = document.getElementById('deliveryInfoLink');
const privacyPolicyLink = document.getElementById('privacyPolicyLink');
const termsConditionsLink = document.getElementById('termsConditionsLink');
const contactUsLink = document.getElementById('contactUsLink');

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
            '<li>All content on this site is for your general information and use only. It. is subject to change without notice.</li>' +
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

// Mobile Navbar functionality (already present but good to keep)
// This part is already handled at the top of the script.
