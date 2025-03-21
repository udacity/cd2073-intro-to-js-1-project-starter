// Array to hold the products available for sale
const products = [
    {
        name: "Cherry",
        price: 2,
        quantity: 0,
        productId: 1,
        image: "images/cherry.jpg"
    },
    {
        name: "Orange",
        price: 3,
        quantity: 0,
        productId: 2,
        image: "images/orange.jpg"
    },
    {
        name: "Strawberry",
        price: 4,
        quantity: 0,
        productId: 3,
        image: "images/strawberry.jpg"
    }
];

// Array to hold items in the shopping cart
let cart = [];

// Global variable to track the total paid amount
let totalPaid = 0;

/**
 * Helper function to find a product by its ID.
 * @param {number} productId - The ID of the product.
 * @returns {object|null} - The product object if found, otherwise null.
 */
function getProductById(productId) {
    return products.find(p => p.productId === productId) || null;
}

/**
 * Adds a product to the cart or increases its quantity if it already exists.
 * @param {number} productId - The ID of the product to add.
 */
function addProductToCart(productId) {
    let product = getProductById(productId);
    if (!product) return;

    let cartItem = cart.find(item => item.productId === productId);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
}

/**
 * Increases the quantity of a product in the cart.
 * @param {number} productId - The ID of the product.
 */
function increaseQuantity(productId) {
    let cartItem = cart.find(item => item.productId === productId);
    if (cartItem) {
        cartItem.quantity++;
    }
}

/**
 * Decreases the quantity of a product in the cart.
 * If quantity reaches 0, the product is removed.
 * @param {number} productId - The ID of the product.
 */
function decreaseQuantity(productId) {
    let cartItem = cart.find(item => item.productId === productId);
    if (cartItem) {
        cartItem.quantity--;
        if (cartItem.quantity === 0) {
            removeProductFromCart(productId);
        }
    }
}

/**
 * Removes a product from the cart.
 * @param {number} productId - The ID of the product to remove.
 */
function removeProductFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
}

/**
 * Calculates the total cost of all products in the cart.
 * @returns {number} - The total price of items in the cart.
 */
function cartTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

/**
 * Empties the cart and resets the totalPaid variable.
 */
function emptyCart() {
    cart = [];
    totalPaid = 0;
}

/**
 * Processes a payment and ensures it meets the required conditions.
 * If the payment is enough, empty the cart and return the change.
 * If the payment is insufficient, return the remaining balance needed.
 * @param {number} amount - The amount paid by the customer.
 * @returns {number} - The remaining balance or change.
 */
function pay(amount) {
    let total = cartTotal(); // Total of items in the cart
    let remainingBalance = amount - total; // The difference between the paid amount and total cost

    // If the amount paid is enough, empty the cart and return the change
    if (amount >= total) {
        totalPaid = amount; // Store the paid amount
        emptyCart(); // Empty the cart
    } else {
        totalPaid = amount; // Store the paid amount, but cart won't be emptied if insufficient
    }

    return remainingBalance; // If paid more than required, return the change, else return the remaining balance
}

// Exporting functions for testing
module.exports = {
    products,
    cart,
    addProductToCart,
    increaseQuantity,
    decreaseQuantity,
    removeProductFromCart,
    cartTotal,
    pay,
    emptyCart,
    getProductById
};
