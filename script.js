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
