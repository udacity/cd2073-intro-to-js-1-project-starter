/* Create an array named products which you will use to add all of your product
   object literals that you create in the next step. */
const products = [];

/* Just the germ of an idea for adding new products easily.
  For a production environment you would want a utility that
  let a product manager add a new product to a database of some
  sort, whether it be a json file or sql database. For proof
  of concept this array of products will suffice as a "database."
*/

/* Put your correctly sized jpg in the images folder then add
  your new product to the list
*/
const productNames = [{
    type: "cherry",
    unit: "Carton of Cherries"
}, {
    type: "orange",
    unit: "Bag of Oranges"
}, {
    type: "strawberry",
    unit: "Carton of Strawberries"
}, {
    type: "carrot",
    unit: "Bunch of Carrots"
}];

/* Create 3 or more product objects using object literal notation
   Each product should include five properties
   - name: name of product (string)
   - price: price of product (number)
   - quantity: quantity in cart should start at zero (number)
   - productId: unique id for the product (number)
   - image: picture of product (url string)
*/
// We are in the 'assets' folder. Go up a level then down to images.
const imgBaseUrl = "../images/";

productNames.forEach((item, i) => {
    const product = {
        image: (imgBaseUrl + item.type + ".jpg"),
        name: item.unit,
        price: (item.unit.length / 2), // Could putin productNames.
        productId: (100 + i),
        quantity: 0
    };
    products.push(product);
});


/* Images provided in /images folder. All images from Unsplash.com
   - cherry.jpg by Mae Mu
   - orange.jpg by Mae Mu
   - carrot.jpg by Mae Mu
   - strawberry.jpg by Allec Gomes
*/

/* Declare an empty array named cart to hold the items in the cart */
const cart = [];
/* Create a function named addProductToCart that takes in the product productId
   as an argument
  - addProductToCart should get the correct product based on the productId
  - addProductToCart should then increase the product's quantity
  - if the product is not already in the cart, add it to the cart
*/
function getProductById(plist, productId) {
    let idx = 0;  // Make lint happy
    for (idx = 0; idx < plist.length; ++idx) {
        const product = plist[idx];
        if (product.productId === productId) {
            return (idx);
        }
    }
    console.log("\nNo such productId.\n");
    return (0);
}

function addProductToCart(productId) {
    const productIdx = getProductById(products, productId);
    const product = products[productIdx];
    if (product.quantity === 0) {
      cart.push(product);
    }
    product.quantity += 1;
}

/* Create a function named increaseQuantity that takes in the productId as
   an argument
  - increaseQuantity should get the correct product based on the productId
  - increaseQuantity should then increase the product's quantity
*/
function increaseQuantity(productId) {
    const productIdx = getProductById(cart, productId);
    const product = cart[productIdx];
    product.quantity += 1;
}
/* Create a function named decreaseQuantity that takes in the productId
   as an argument
  - decreaseQuantity should get the correct product based on the productId
  - decreaseQuantity should decrease the quantity of the product
  - if the function decreases the quantity to 0, the product is removed from
    the cart
*/
function decreaseQuantity(productId) {
    const productIdx = getProductById(cart, productId);
    const product = cart[productIdx];
    if (product.quantity > 0) {
      product.quantity -= 1;
    }
    if (product.quantity === 0) {
        removeProductFromCart(productId);
    }
}
/* Create a function named removeProductFromCart that takes in the productId
   as an argument
  - removeProductFromCart should get the correct product based on the productId
  - removeProductFromCart should update the product quantity to 0
  - removeProductFromCart should remove the product from the cart
*/
function removeProductFromCart(productId) {
    const productIdx = getProductById(cart, productId);
    const product = cart[productIdx];
    cart.splice(productIdx, 1);
    product.quantity = 0;
}
/* Create a function named cartTotal that has no parameters
  - cartTotal should iterate through the cart to get the total cost of all products
  - cartTotal should return the total cost of the products in the cart
  Hint: price and quantity can be used to determine total cost
*/
function cartTotal() {
    let total = 0;
    cart.forEach(function (product) {
        total += product.quantity * product.price;
    });
    return (Number(total.toFixed(2)));
}

/* Create a function called emptyCart that empties the products from the cart */
function emptyCart() {
    // We have to remove them from the end to leverage removeProductFromCart
    let idx = 0;
    for (idx = cart.length - 1; idx >= 0; idx--) {
        const product = cart[idx];
        removeProductFromCart(product.productId);
    }
    ledger.resetLedger();
}
/* Create a function named pay that takes in an amount as an argument
  - amount is the money paid by customer
  - pay will return a negative number if there is a remaining balance
  - pay will return a positive number if money should be returned to customer
  Hint: cartTotal function gives us cost of all the products in the cart  
*/
const ledger = {
    totalOwed: 0,     // lint can go suck eggs. I'm not changing the order of
    totalPaid: 0,     // the properties. Clarity trumps EVERYTHING.
    balanceDue: 0,
    resetLedger: function () {
        ledger.totalOwed = 0;
        ledger.totalPaid = 0;
        ledger.balanceDue = 0;
    },
    updateLedger: function (conversionFactor) {
        console.log("updateLedger");
        ledger.totalOwed = Number((ledger.totalOwed * conversionFactor)
            .toFixed(2));
        ledger.totalPaid = Number((ledger.totalPaid * conversionFactor)
            .toFixed(2));
        ledger.balanceDue = Number((ledger.balanceDue * conversionFactor)
            .toFixed(2));
    }
};

function pay(amount) {
    /* The rubric and specs say nothing about the behavior of the Shopping
    Cart once the customer has been paid in full so I've decided
    to empty the cart and reset the ledger.
    */
    ledger.totalOwed = cartTotal();
    ledger.totalPaid += amount;
    const remainingDue = ledger.totalPaid - ledger.totalOwed;
    if (remainingDue >= 0) {
        emptyCart(); // They paid. They're gone.
    }
    return (Number(remainingDue.toFixed(2)));
}
/* Place stand out suggestions here (stand out suggestions can be found at the
bottom of the project rubric.)*/

/* Store the data needed to convert from one currency to another.
   USD will be the base so in we will have to convert back to USD
   if the current currency is something else. This should all work even
   if new currencies are added as long as they are added using
   their standard name, so JPY not YEN.
*/
const currencyData = {
    currency: "USD", // This is the default
    exchangeRates: ""
};

async function getExchangeRates() {
    let url =
    "https://v6.exchangerate-api.com/v6/78c55d35ae69e85d7dae1789/latest/USD";
    try {
        const res = await fetch(url); // Lint says fetch is not defined lol.
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

/* Get the factor to use for converting from the current currency to the new. */
function getConverstionFactor(newCurrency) {
    const oldCurrency = currencyData.currency;
    const oldRate = currencyData.exchangeRates.conversion_rates[oldCurrency];
    const newRate = currencyData.exchangeRates.conversion_rates[newCurrency];
    return (newRate / oldRate);
}

/* loop through the products and update the prices based on the new currency. */
function updatePrices(newCurrency) {
    const conversionFactor = getConverstionFactor(newCurrency);
    products.forEach((product) => {
        const newPrice = Number((product.price * conversionFactor)
            .toFixed(0));
        product.price = newPrice;
    });
    ledger.updateLedger(conversionFactor);
    currencyData.currency = newCurrency;
}

/* Thanks to the W3collective for insights on getting exchange rates and
   using Fetch. https://w3collective.com/currency-converter-html-javascript/
*/
async function currency(newCurrency) {
    // Fetch the exchangeRates only one time per session. No point in
    // consuming our free quota too quickly.
    if (currencyData.exchangeRates === "") {
        currencyData.exchangeRates = await getExchangeRates();
    }
    updatePrices(newCurrency);
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
    currency
};
