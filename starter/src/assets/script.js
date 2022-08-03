/* Create an array named products which you will use to add all of your product object literals that you create in the next step. */

const products = [];

/* Create 3 or more product objects using object literal notation 
   Each product should include five properties
   - name: name of product (string)
   - price: price of product (number)
   - quantity: quantity in cart should start at zero (number)
   - productId: unique id for the product (number)
   - image: picture of product (url string)
*/
products[0] = {
  name: "Cherry",
  price: 5,
  quantity: 0,
  productId: 101,
  image: "./images/cherry.jpg"
}

products[1] = {
  name: "Orange",
  price: 2,
  quantity: 0,
  productId: 102,
  image: "./images/orange.jpg"
}

products[2] = {
  name: "Strawberry",
  price: 3,
  quantity: 0,
  productId: 103,
  image: "./images/strawberry.jpg"
}

/* Images provided in /images folder. All images from Unsplash.com
   - cherry.jpg by Mae Mu
   - orange.jpg by Mae Mu
   - strawberry.jpg by Allec Gomes
*/

/* Declare an empty array named cart to hold the items in the cart */

let cart = [];

/* Create a function named addProductToCart that takes in the product productId as an argument
  - addProductToCart should get the correct product based on the productId
  - addProductToCart should then increase the product's quantity
  - if the product is not already in the cart, add it to the cart
*/
function addProductToCart(productId){
  //let product = products.find(element => element.productId == productId);
 
  for(const element of cart){
   if(element.productId === productId){
       element.quantity++
       return;
   }
   
   }
   for(const element of products){
       if(element.productId === productId){
           element.quantity++;
           cart.push(element);
           return;
       }
   }
}

/* Create a function named increaseQuantity that takes in the productId as an argument
  - increaseQuantity should get the correct product based on the productId
  - increaseQuantity should then increase the product's quantity
*/
function increaseQuantity(productId){
  const product = cart.find(product => product.productId === productId);
  product.quantity++;
}

/* Create a function named decreaseQuantity that takes in the productId as an argument
  - decreaseQuantity should get the correct product based on the productId
  - decreaseQuantity should decrease the quantity of the product
  - if the function decreases the quantity to 0, the product is removed from the cart
*/
function decreaseQuantity(productId){
  cart.forEach((product,index) => {
    // Go through each element in cart[] 
    if(product.productId === productId){
      if(product.quantity - 1 === 0){
        // remove from cart if quntity = 0
        product.quantity--;
        cart.splice(index,1);
        return;
      }
      product.quantity--;
      return;
    } 
  })
}


/* Create a function named removeProductFromCart that takes in the productId as an argument
- removeProductFromCart should get the correct product based on the productId
- removeProductFromCart should update the product quantity to 0
- removeProductFromCart should remove the product from the cart
*/
function removeProductFromCart(productId){
  cart.forEach((product,index) =>{
    // Go through each element in cart[]  
    if(product.productId === productId){
      // remove from cart 
      product.quantity = 0;
      cart.splice(index,1);
      return;
    }
  })
}


/* Create a function named cartTotal that has no parameters
- cartTotal should iterate through the cart to get the total of all products
- cartTotal should return the sum of the products in the cart
*/
let totalPaid = 0;

 function cartTotal(){
  if(cart.length === 0){
    return 0;
  }
  let sum = 0;
  cart.forEach(product =>{
    sum += +(product.quantity * product.price).toFixed(2);
  }); 
  return sum;
 }

/* Create a function called emptyCart that empties the products from the cart */

function emptyCart(){
  cart.splice(0,cart.length);
}

/* Create a function named pay that takes in an amount as an argument
  - pay will return a negative number if there is a remaining balance
  - pay will return a positive number if money should be returned to customer
*/
function pay(amount){
  totalPaid += amount;
  return +(totalPaid - cartTotal()).toFixed(2);
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
   // currency
}

