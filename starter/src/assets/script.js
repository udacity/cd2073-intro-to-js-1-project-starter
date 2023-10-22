/* Create an array named products which you will use to add all of your product object literals that you create in the next step. */
const products = [
  {
    productId: 1,
    name: 'Cherries',
    price: 19.99,
    quantity: 0,
    image: '/starter/src/images/cherry.jpg',
  },
  {
    productId: 2,
    name: 'Orange',
    price: 24.99,
    quantity: 0,
    image: '/starter/src/images/orange.jpg',
  },
  {
    productId: 3,
    name: 'Strawberries',
    price: 14.99,
    quantity: 0,
    image: '/starter/src/images/strawberry.jpg',
  },
];


/* Create 3 or more product objects using object literal notation 
   Each product should include five properties
   - name: name of product (string)
   - price: price of product (number)
   - quantity: quantity in cart should start at zero (number)
   - productId: unique id for the product (number)
   - image: picture of product (url string)
*/

/* Images provided in /images folder. All images from Unsplash.com
   - cherry.jpg by Mae Mu
   - orange.jpg by Mae Mu
   - strawberry.jpg by Allec Gomes
*/

/* Declare an empty array named cart to hold the items in the cart */
const cart = [];


/* Create a function named addProductToCart that takes in the product productId as an argument
  - addProductToCart should get the correct product based on the productId
  - addProductToCart should then increase the product's quantity
  - if the product is not already in the cart, add it to the cart
*/
function addProductToCart(productId) {
  //Find the product with the given productId
  const product = products.find((p) => p.productId === productId);

  if (product) {
    // Check if the product is already in the cart
    const cartItem = cart.find((item) => item.productId === productId);

    if (cartItem) {
      // If the product is already in the cart, increase its quantity
      cartItem.quantity++;
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      const productToAdd = { ...product, quantity: 1 };
      cart.push(productToAdd);
    }
  } else {
    console.log('Product not found'); // Handle the case where the product doesn't exist
  }
}


/* Create a function named increaseQuantity that takes in the productId as an argument
  - increaseQuantity should get the correct product based on the productId
  - increaseQuantity should then increase the product's quantity
*/
function increaseQuantity(productId) {
  // Find the product with the given productId in the cart
  const cartItem = cart.find((item) => item.productId === productId);

  if (cartItem) {
    // If the product is found in the cart, increase its quantity
    cartItem.quantity++;
  } else {
    console.log('Product not found in the cart'); // Handle the case where the product is not in the cart
  }
}

/* Create a function named decreaseQuantity that takes in the productId as an argument
  - decreaseQuantity should get the correct product based on the productId
  - decreaseQuantity should decrease the quantity of the product
  - if the function decreases the quantity to 0, the product is removed from the cart
*/
function decreaseQuantity(productId) {
  // Find the product with the given productId in the cart
  const cartItem = cart.find((item) => item.productId === productId);

  if (cartItem) {
    // If the product is found in the cart, decrease its quantity
    cartItem.quantity--;

    if (cartItem.quantity === 0) {
      // If the quantity becomes 0, remove the product from the cart
      removeProductFromCart(productId);
    }
  } else {
    console.log('Product not found in the cart'); // Handle the case where the product is not in the cart
  }
}


/* Create a function named removeProductFromCart that takes in the productId as an argument
  - removeProductFromCart should get the correct product based on the productId
  - removeProductFromCart should update the product quantity to 0
  - removeProductFromCart should remove the product from the cart
*/
function removeProductFromCart(productId) {
  // Find the index of the product with the given productId in the cart
  const index = cart.findIndex((item) => item.productId === productId);

  if (index !== -1) {
    // Set the quantity of the product to 0
    cart[index].quantity = 0;

    // Remove the product from the cart
    cart.splice(index, 1);
  } else {
    console.log('Product not found in the cart'); // Handle the case where the product is not in the cart
  }
}

/* Create a function named cartTotal that has no parameters
  - cartTotal should iterate through the cart to get the total of all products
  - cartTotal should return the sum of the products in the cart
*/
function cartTotal() {
  let total = 0;

  // Iterate through the cart and calculate the total cost
  for (const item of cart) {
    total += item.price * item.quantity;
  }

  return total;
}
/* Create a function called emptyCart that empties the products from the cart */
function emptyCart() {
  cart.length = 0; // Set the cart array to an empty array
}
/* Create a function named pay that takes in an amount as an argument
  - pay will return a negative number if there is a remaining balance
  - pay will return a positive number if money should be returned to customer
*/
function pay(amount) {
  const total = cartTotal();
  const difference = amount - total;

  return difference;
}
/* Place stand out suggestions here (stand out suggestions can be found at the bottom of the project rubric.)*/


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
    //currency
}
