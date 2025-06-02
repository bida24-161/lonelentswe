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
        alert(`BWP{productName} added to cart!`); // Simple feedback
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
            '<p><strong>Standard Delivery:</strong> 3-5 business days. Free for orders over BWP100.</p>' +
            '<p><strong>Express Delivery:</strong> 1-2 business days. Flat rate of BWP15.</p>' +
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
            '<p><strong>Phone:</strong> +267 74697684</p>' +
            '<p><strong>Address:</strong> 1084 Mogoma Rd, Gaborone</p>' +
            '<p><strong>Business Hours:</strong> Monday - Saturday, 10:00 AM - 6:00 PM</p>'
        );
    });
}

// Mobile Navbar functionality (already present but good to keep)
// This part is already handled at the top of the script.

// Add to cart functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add click event to all "Add to Cart" buttons
    document.querySelectorAll('.buy-icon').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation(); // Prevent triggering the product click
            
            const productElement = this.closest('.pro');
            const productImg = productElement.querySelector('img').src;
            const productName = productElement.querySelector('h5').textContent;
            const productPrice = parseFloat(productElement.querySelector('h4').textContent.replace('BWP', ''));
            
            // Generate a simple ID from the image path
            const productId = productImg.split('/').pop().split('.')[0];
            
            // Add to cart
            addToCart({
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1,
                image: productImg
            });
            
            // Show added notification
            alert(`BWP{productName} has been added to your cart!`);
        });
    });
    
    // Mobile menu toggle
    const bar = document.getElementById('bar');
    const close = document.getElementById('close');
    const navbar = document.getElementById('navbar');
    
    if (bar) {
        bar.addEventListener('click', () => {
            navbar.classList.add('active');
        });
    }
    
    if (close) {
        close.addEventListener('click', () => {
            navbar.classList.remove('active');
        });
    }
    
    // Update cart count on page load
    updateCartCount();
});

// Add item to cart
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(product);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Update cart count in navbar
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    
    cartCountElements.forEach(el => {
        el.textContent = totalItems;
        el.style.display = totalItems > 0 ? 'inline-block' : 'none';
    });
}
