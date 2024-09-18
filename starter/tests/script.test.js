// Product data with images
const products = [
    { id: 1, name: "Bunch of Banana", price: 10.00, image: "images/banana.jpg" },
    { id: 2, name: "Bag of Orange", price: 15.00, image: "images/orange.jpg" },
    { id: 3, name: "Carton of Strawberries", price: 20.00, image: "images/strawberry.jpg" }
];

let cart = [];
let amountDue = 0;
let totalAmountPaid = 0;

// Display products
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '<h2 class="centered-title">Mohamed\'s Product Listing</h2>';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <div>
                <h2>${product.name}</h2>
                <p>Price: $${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productList.appendChild(productDiv);
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.product.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ product, quantity: 1 });
    }

    updateCart();
}

// Update cart display
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    cart.forEach(item => {
        const itemDiv = document.createElement('li');
        const itemTotal = (item.product.price * item.quantity).toFixed(2);
        itemDiv.innerHTML = `
            ${item.product.name} - Price: $${item.product.price.toFixed(2)} x Quantity: ${item.quantity} = Total: $${itemTotal}
            <button onclick="removeFromCart(${item.product.id})">Remove</button>
            <button onclick="increaseQuantity(${item.product.id})">+</button>
            <button onclick="decreaseQuantity(${item.product.id})">-</button>
        `;
        cartItems.appendChild(itemDiv);
    });

    amountDue = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    document.getElementById('total-amount').innerText = `$${amountDue.toFixed(2)}`;
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.product.id !== productId);
    updateCart();
}

// Increase quantity of product
function increaseQuantity(productId) {
    const cartItem = cart.find(item => item.product.id === productId);
    if (cartItem) cartItem.quantity++;
    updateCart();
}

// Decrease quantity of product
function decreaseQuantity(productId) {
    const cartItem = cart.find(item => item.product.id === productId);
    if (cartItem) {
        cartItem.quantity--;
        if (cartItem.quantity <= 0) removeFromCart(productId);
        else updateCart();
    }
}

// Empty the cart
function emptyCart() {
    cart = [];
    updateCart();
}

// Process checkout
function processCheckout() {
    const cashReceived = parseFloat(document.getElementById('cash-received').value) || 0;
    let receiptText = '';
    let balanceText = '';
    let cashReturned = 0;

    if (cashReceived < amountDue) {
        receiptText = `Please pay an additional amount of $${(amountDue - cashReceived).toFixed(2)}.`;
        balanceText = '';
    } else {
        cashReturned = cashReceived - amountDue;
        receiptText = `Change Due: $${cashReturned.toFixed(2)}`;
        balanceText = `You have paid more than the total amount.`;
    }

    document.getElementById('receipt').innerText = receiptText;
    document.getElementById('balance').innerText = balanceText;
    document.getElementById('cash-returned').innerText = `Cash Returned: $${cashReturned.toFixed(2)}`;
    document.getElementById('thank-you').innerText = 'Thank you!';
    emptyCart();
}

// Initialize the product display
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
});
