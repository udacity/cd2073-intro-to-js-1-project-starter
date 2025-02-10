/* Create an array named products which you will use to add all of your product object literals */
const products = [
    {
        name: "Cherry",
        price: 2.99,
        quantity: 0,
        productId: 1,
        image: "images/cherry.jpg"
    },
    {
        name: "Orange",
        price: 1.99,
        quantity: 0,
        productId: 2,
        image: "images/orange.jpg"
    },
    {
        name: "Strawberry",
        price: 3.49,
        quantity: 0,
        productId: 3,
        image: "images/strawberry.jpg"
    }
];

/* Declare an empty array named cart to hold the items in the cart */
let cart = [];

function addProductToCart(productId) {
    let product = products.find(p => p.productId === productId);
    if (product) {
        let cartItem = cart.find(item => item.productId === productId);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
    }
}

function increaseQuantity(productId) {
    let cartItem = cart.find(item => item.productId === productId);
    if (cartItem) {
        cartItem.quantity++;
    }
}

function decreaseQuantity(productId) {
    let cartItem = cart.find(item => item.productId === productId);
    if (cartItem) {
        cartItem.quantity--;
        if (cartItem.quantity === 0) {
            removeProductFromCart(productId);
        }
    }
}

function removeProductFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
}

function cartTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function emptyCart() {
    cart = [];
}

function pay(amount) {
    return amount - cartTotal();
}

module.exports = {
    products,
    cart,
    addProductToCart,
    increaseQuantity,
    decreaseQuantity,
    removeProductFromCart,
    cartTotal,
    pay,
    emptyCart
};
