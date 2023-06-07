const container = document.getElementById("container");

const URL = "https://fakestoreapi.com/products";
const loadData = async (url) => {
  const response = await fetch(url);
  const result = await response.json();
  displayProduct(result);
};

const displayProduct = (products) => {

  products
    .map((product) => {
      const { id, image, title, price, description } = product;
      const splitDescription = description.split(" ");
      const sliceDescription = splitDescription.slice(0, 10);

      const joinDescription = sliceDescription.join(" ");

      const createDiv = document.createElement("div");
      createDiv.classList.add("col");
      createDiv.innerHTML = `
    <div class="card h-75">
      <img src="${image}" class="card-img-top h-50" alt="...">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${joinDescription}<a href="#" class="text-decoration-none">Read more...</a></p>
      </div>
      <h5>${price}$</h5>
      <button type="button" class="btn bg-success mb-5 w-50" onclick="cartCalculate(${id},${price})">Add to cart</button>

    </div>
    
    `;
      container.appendChild(createDiv);
    })
    .join(" ");
};
loadData(URL);

const textInner = (id) => { 
  const element = document.getElementById(id);
  return element;

} 
const itemCalculated = (initial) => { 
const cartItem = textInner("cart-item");
count = count + 1;
if (count < 10) {
  cartItem.innerText = "0" + count;
} else {
  cartItem.innerText = count;
}
}

 let count=0
const cartCalculate = (id, price) => { 
  
 itemCalculated(count) 
 
  
}




// let count = 0;
// function totalCart(id, price) {
//   const itemCount = document.getElementById("cart-item");
//   console.log(itemCount)
//   // price calculated

//   const getPrice = elementGet("cart-price");

//   price = parseFloat(getPrice) + parseFloat(price);
//   getPrice.innerText = price.toFixed(2);
//   // delivery charges
//   const deliveryCharge = document.getElementById("cart-delivery-charge");
//   if (price > 0) {
//     if (price > 0 && price <= 300) {
//       deliveryCharge.innerText = 100;
//     } else if (price > 301 && price <= 800) {
//       deliveryCharge.innerText = 150;
//     } else {
//       deliveryCharge.innerText = 300;
//     }
//   }
//   // tax calculate
//   const cartTax = document.getElementById("cart-tax");
//   let tax = (price + parseFloat(deliveryCharge.innerText)) * (20 / 100);
//   tax = tax.toFixed(2);
//   cartTax.innerText = tax;
//   const cartGrand = document.getElementById("cart-grand");
//   let grandTotal = parseFloat(cartGrand.innerText);

//   grandTotal =
//     price + parseFloat(deliveryCharge.innerText) + parseFloat(tax);

//   cartGrand.innerText = grandTotal.toFixed(2);
// }
