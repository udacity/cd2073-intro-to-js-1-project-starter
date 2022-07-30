
let products = [
  {
    name: "Carton of Cherries",
    price: 4,
    quantity: 0,
    productId: 1,
    image: "../images/cherry.jpg",
  },
  {
    name: "Carton of Strawberries",
    price: 5,
    quantity: 0,
    productId: 2,
    image: "../images/strawberry.jpg",
  },
  {
    name: "Carton of Oranges",
    price: 4,
    quantity: 0,
    productId: 3,
    image: "../images/orange.jpg",
  },
];


let cart = [];


function addProductToCart(productId) {
  for (let i = 0; i < products.length; i++) {
    if (productId === products[i].productId) {
      if (cart.includes(products[i])) {
        products[i].quantity++;
      } else {
        cart.push(products[i]);
        products[i].quantity++;
      }
    }
  }
  console.log(cart);
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
  console.log(sum);
  return sum;
}


function emptyCart() {
  cart = [];
  products.forEach(function (product) {
    product.quantity = 0;
  });
}

function pay(amount) {
  let balance = 0;
  balance = cartTotal();
  return  amount - balance;
}


/* The following is for running unit tests. 
   To fully complete this project, it is expected that all tests pass.
   Run the following command in terminal to run tests
   npm run test
*/

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
  /* Uncomment the following line if completing the currency converter bonus */
  // currency
};
