const container = document.getElementById("container");
const modalContainer = document.getElementById("modal-area");
const spinner=document.getElementById("spinner");

const URL = "https://fakestoreapi.com/products";
const loadData = async (url) => {
  const response = await fetch(url);
  const result = await response.json();
  displayProduct(result);
};

const displayProduct = (products) => {
  if (!products.length) { 
    spinner.classList.remove("d-none")
  }
  products
    .map((product) => {
      const { id, image, title, price, description, category, rating } =
        product;
      const rate = Object.values(rating);

      const splitDescription = description.split(" ");
      const sliceDescription = splitDescription.slice(0, 10);

      const joinDescription = sliceDescription.join(" ");

      const createDiv = document.createElement("div");
      createDiv.classList.add("col");
      createDiv.innerHTML = `
    <div class="card h-75">
      <div class="h-50  ">
      <img src="${image}" class="card-img-top h-100 p-4 " alt="...">
      </div
      <div class="card-body h-50 px-3  position-relative">
       <h5 class="text-center">${title}</h5>
      
       <div class="d-flex justify-content-between">
        <p class="ps-2 fw-bold">Rating: ${rate[0]}/${rate[1]}</p>
         <p class="fw-bold">Category: ${category}<p/>
       </div>
      
 <h5 class="px-3"> Price : ${price}$</h5>
       <div class="d-flex px-4 position-absolute bottom-0 justify-content-between w-100 pb-2">
       <button class="btn btn-success text-white fw-medium" type="button" data-bs-toggle="modal" data-bs-target="#modalContainer" onclick=(modalShow(${id}))>Details</button>
       <button class="btn btn-danger text-white fw-medium" type="button" onclick=(cartCalculate(${id},${price}))>Add To Cart</button>
       </div>
        
      </div>
      
    </div>
    
    `;
      container.appendChild(createDiv);
    })
    .join(" ");
  spinner.classList.add("d-none");
};
loadData(URL);


// modal show
const modalShow = (id) => {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((response) => response.json())
    .then((result) => displayModal(result));
};

const displayModal = (product) => {
  const {id, title, price, rating, image, category, description } = product;
  const rate = Object.values(rating);
 
  modalContainer.innerHTML = `
        <img src="${image}" class="w-100 h-50 px-5 pb-2">
        <h5 class="text-center">${title}</h5>
        <div class="d-flex ">
        <div class='w-50 px-4'>
        <p class="w-50 fw-bold">Description </p>
        <p> ${description}</p>
        </div>
        <div class="w-50 ps-5 mt-5">
         <p class="fw-bold">Category: ${category}<p>
         <p>Rating: ${rate[0]}/${rate[1]}</p>
         <h5>Price: ${price}<h5>

        </div>
        </div>
        <div class="d-flex justify-content-center"><button class="btn btn-success border-0  " onclick=(cartCalculate(${id},${price}))> Add to Cart</button></div>


  `;

};

const textInner = (id) => {
  const element = document.getElementById(id);
  return element;
};
// item count calculated

const itemCalculated = () => {
  const cartItem = textInner("cart-item").innerText;
  let count= parseInt(cartItem)
  count = count + 1;
 return count
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
  } else if (price >= 400 && price < 1000) {
    charge = 80;
  } else if (price >= 1000 && price < 1500) {
    charge = 100;
  } else {
    charge = 150;
  }

  return charge;
};

//tax calculation
const taxCalculation = (price, charge) => {
  const tax = (price + charge) * 0.2;
  return tax;
};
// grand total calculation
const granTotal = (price, charge, tax) => {
  const total = price + charge + tax;
  return total;
};

const cartCalculate = (id, price) => {
  //count item
  const newCount = itemCalculated();
   if (newCount < 10) {
     textInner("cart-item").innerText = "0" + newCount;
   } else {
     textInner("cart-item").innerText = newCount;
   }
 
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
  textInner("cart-grand").innerText = Math.round(newTotal);
  setStorage(newCount, newPrice, newCharge, newTax, newTotal);
};



// local storage

const getStorage = () => { 
  let cart = {};
  const storeData = window.localStorage.getItem("cart");
  if (storeData) { 
    cart=JSON.parse(storeData);
  }
  return cart;
}
const setStorage = (item,price,tax,charge,total) => {
  const cart = getStorage();
  cart['item'] = Math.round(item);
  cart['price'] = Math.round(price);
  cart['tax'] = Math.round(tax);
  cart['charge'] = Math.round(charge);
  cart['total'] = Math.round(total);
  const stringyCart = JSON.stringify(cart)
  localStorage.setItem("cart", stringyCart);
}
const displayCart = () => {
  const cart = getStorage();
  const newCart = Object.values(cart);
  for (let i = 0; i < newCart.length - 1; i++) { 
    if (newCart[0] < 10) {
      textInner("cart-item").innerText ="0"+newCart[0];
    } else {
      textInner("cart-item").innerText = newCart[0];
    }
    
    textInner("cart-price").innerText = newCart[1];
    textInner("cart-delivery-charge").innerText = newCart[2];
    textInner("cart-tax").innerText = newCart[3];
    textInner("cart-grand").innerText = newCart[4];
  }
   
}
 displayCart()