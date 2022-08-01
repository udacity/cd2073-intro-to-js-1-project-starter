let products = [
  {
    name: "Carton of Cherries",
    price: 4,
    quantity: 0,
    productId: 1,
    image: "./images/cherry.jpg",
  },
  {
    name: "Carton of Strawberries",
    price: 5,
    quantity: 0,
    productId: 2,
    image: "./images/strawberry.jpg",
  },
  {
    name: "Carton of Oranges",
    price: 4,
    quantity: 0,
    productId: 3,
    image: "./images/orange.jpg",
  },
];

let cart = [];

function addProductToCart(productId) {
  products.forEach((product) => {
    if (productId === product.productId) {
      if (cart.includes(product)) {
        product.quantity++;
      } else {
        cart.push(product);
        product.quantity++;
      }
    }
  });
}

function increaseQuantity(productId) {
  for (let i = 0; i < products.length; i++) {
    if (productId === products[i].productId) {
      products[i].quantity++;
    }
  }
}

function decreaseQuantity(productId) {
  for (let i = 0; i < products.length; i++) {
    if (productId === products[i].productId) {
      products[i].quantity--;
      if (products[i].quantity < 1) {
        cart.splice(cart.indexOf(products[i]), 1);
      }
    }
  }
}

function removeProductFromCart(productId) {
  for (let i = 0; i < products.length; i++) {
    if (productId === products[i].productId) {
      products[i].quantity = 0;
      cart.splice(cart.indexOf(products[i]), 1);
    }
  }
}

function cartTotal() {
  let sum = 0;
  cart.forEach(function (product) {
    sum = sum + product.quantity * product.price;
  });
  return sum;
}

function emptyCart() {
  cart = [];
  products.forEach(function (product) {
    product.quantity = 0;
  });
}

let totalPaid = 0;
function pay(amount) {
  let balance = cartTotal();
  totalPaid += amount;

  return totalPaid - balance;
}

// badly made currency converter, couldn't manage to create a more practical converter.
function currency(currency) {
  if (currency === "USD") {
    products[0].price = 4;
    products[1].price = 5;
    products[2].price = 4;
  } else if (currency === "EUR") {
    products[0].price = 3.91;
    products[1].price = 4.89;
    products[2].price = 3.91;
  } else if (currency === "YEN") {
    products[0].price = 532.98;
    products[1].price = 666.23;
    products[2].price = 532.98;
  }
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
  emptyCart,
  currency,
};
