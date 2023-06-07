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
};
// item count calculated
let count = 0;
const itemCalculated = () => {
  const cartItem = textInner("cart-item");
  count = count + 1;
  if (count < 10) {
    cartItem.innerText = "0" + count;
  } else {
    cartItem.innerText = count;
  }
};

// price calculate function

const updatePrice = (id, price) => {
  const getPrice = textInner(id).innerText;
  const totalPrice = parseFloat(price) + parseFloat(getPrice);
  return totalPrice;
};

// delivery charge calculated
const DeliveryCalculated = (price) => {
  
  let charge = 0;
  if (price >= 0 && price < 400) {
    charge = 50;
  }
   else if (price >= 400 && price < 1000) {
    charge = 80;
  } else if (price >= 1000 && price < 1500) {
    charge = 100;
  }
   else {
    charge = 150;
  }

  return charge;
};

//tax calculation
const taxCalculation = (price, charge) => {
  const tax = (price + charge) * .20;
  return tax;
  
}
// grand total calculation
const granTotal = (price, charge, tax) => {
  const total = price + charge + tax;
  return total;
 }

const cartCalculate = (id, price) => {
  //count item
  itemCalculated();
  // calculate price
  let newPrice = updatePrice("cart-price", price);
  textInner("cart-price").innerText = Math.round(newPrice);
  // delivery charge calculation

  let newCharge = DeliveryCalculated(newPrice);
  textInner("cart-delivery-charge").innerText = Math.round(newCharge);

  // tax  calculation
  let newTax = taxCalculation(newPrice, newCharge);
  textInner("cart-tax").innerText = Math.round(newTax);
  // grand total calculation

  const newTotal = granTotal(newPrice, newCharge, newTax);
  textInner("cart-grand").innerText = Math.round(newTotal)
};

