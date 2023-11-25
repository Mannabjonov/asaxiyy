const content = document.querySelector(".content");
const loader = document.querySelector(".loader");
const menu = document.querySelector(".menu_bar");
const leftMenu = document.querySelector(".resp_menu");
const lis = document.querySelectorAll(".resp_menu  ul li");
const exit = document.querySelector(".close_resp");
const rbga = document.querySelector(".rgba");
const searchInput = document.querySelector("#searchInput");
const searchForm = document.querySelector("#searchForm");
const searchcount = document.querySelector("#searchcount");
const navBox = document.querySelector(".nav_products_content");
const cartCount = document.querySelector(".cart_count");
let limit = 100;
let searchProduct = [];
let carts = JSON.parse(localStorage.getItem("carts") || "[]");

const apiUrl = `https://dummyjson.com/products?limit=${limit}`;

menu.addEventListener("click", () => {
  leftMenu.classList.add("show");
  rbga.classList.add("show");
});

lis.forEach((li) => {
  li.addEventListener("click", () => {
    leftMenu.classList.remove("show");
  });
});

exit.addEventListener("click", () => {
  leftMenu.classList.remove("show");
});

async function getProducts(api) {
  try {
    const res = await fetch(api);
    const products = await res.json();
    searchProduct = [...products.products];

    if (res) {
      loader.style.display = "none";
    }
    showProducts(products.products);
  } catch (err) {
    console.log(err);
  }
}
getProducts(apiUrl);

let searched = "";

searchInput.addEventListener("keyup", async (e) => {
  searched = e.target.value.toLowerCase();

  if (e.target.value === "") {
    showProducts(searchProduct);
  }
  try {
    const res = await fetch(
      `https://dummyjson.com/products/search?q=${e.target.value}`
    );
    const filtered = await res.json();
    showProducts(filtered.products);
  } catch (er) {
    console.log(er);
  }
});

// searchForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   if (searched === "") {
//     showProducts(searchProduct);
//   } else {
//     let searchedProd = searchProduct.filter((prod) =>
//       prod.description.toLowerCase().includes(searched)
//     );

//     showProducts(searchedProd);
//   }
// });

const showProducts = (data) => {
  let allBoxes = ``;
  if (data.length) {
    data.forEach((product) => {
      allBoxes += `
      <div class="box">
      <div class="box_header">
        <img src="${product.thumbnail}" alt="laptop">
        <div class="box_sale">
          <p>скидка</p>
        </div>
        <div class="cart_sale" onclick="addToCard(${product.id})  ">
          <i class="fa-solid fa-cart-shopping fa-lg" style="color: #ffffff;"></i>
        </div>
        <div class="heart">
          <i class="fa-regular fa-heart fa-2xl" style="color: #c2c6d1;"></i>
        </div>
      </div>
      <div class="box_content">
        <div class="box_description">
          <p>${product.description}</p>
        </div>
        <div class="icons">
          <i class="fa-solid fa-star" style="color: #008dffff;"></i>
          <i class="fa-solid fa-star" style="color: #008dffff;"></i>
          <i class="fa-solid fa-star" style="color: #008dffff;"></i>
          <i class="fa-solid fa-star" style="color: #008dffff;"></i>
          <i class="fa-solid fa-star" style="color: #008dffff;"></i>
          <i class="fa-regular fa-comment" style="color: #c2c6d1;"></i> <span>1 отзывов</span>
        </div>
        <div class="box_price">
          <p>Brand: ${product.brand}</p>
          <del>Цена ${Math.floor(
            product.price + Math.floor(Math.random() * 50)
          )}$</del>
          <p>Цена ${product.price}$</p>
        </div>
        <button>Купить в 1 клик</button>
      </div>
    </div>
  `;
    });
    content.innerHTML = allBoxes;
  } else {
    content.innerHTML = `<div class = "noProductFound"><h2>NO Result</h2><p><i class="fa-solid fa-ban"></i></p></div>`;
  }
};

const addToCard = (id) => {
  console.log(id);
  let added = searchProduct.find((prod) => prod.id === id);
  if (carts.some((item) => item.id === id)) {
    alert("Bu bor");
  } else {
    carts.unshift(added);
    localStorage.setItem("carts", JSON.stringify(carts));
    showNavCarts();
  }
};

function deleteCart(id) {
  carts = carts.filter((cart) => cart.id !== id);
  localStorage.setItem("carts", JSON.stringify(carts));
  showNavCarts();
}

function showNavCarts() {
  let allCarts = ``;

  cartCount.innerText = carts.length;

  if (carts.length) {
    carts.slice(0, 3).forEach((cart) => {
      allCarts += `
      <div class="nav_cart">
        <p>${cart.title}</p>
        <p onclick='deleteCart(${cart.id})'>delete</p>
      </div>`;
    });
    navBox.innerHTML = allCarts;
  } else {
    navBox.innerText = "Hali Mahsulot yo`q";
  }
}
showNavCarts();
