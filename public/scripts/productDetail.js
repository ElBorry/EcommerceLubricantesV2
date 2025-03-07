import { printIcons } from "./modules/printLayout.js";

//Get Product ID from Params
let url = new URL(window.location.href);
let pid = url.searchParams.get("pid");

//Dynamic Navbar
printIcons();

const productDetailInfo = async () => {
  let product;
  let response = await fetch(`/api/products/${pid}`);
  let data = await response.json();
  product = data.response;

  if (product) {
    const imgProduct = document.querySelector("#img-product");
    imgProduct.src = product.photo;
    document.getElementById("category-product").innerHTML = product.category;
    document.getElementById("title-product").innerHTML = product.title;
    document.getElementById("price-product").innerHTML = "$" + product.price;
  }
};

const addCart = async () => {
  let template = "";
  let online = await fetch("/api/auth");
  online = await online.json();
  if (online.statusCode === 200) {
    template = `
        <button id="addCart"
        class="text-white bg-amber-700 hover:bg-amber-800 focus:ring-4 focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800">Add
        to cart</button>  
        `;
    document.querySelector("#addCartButton").innerHTML = template;

    // Attach event listeners
    document.querySelector("#addCart").addEventListener("click", async () => {
      const data = {
        user_id: online.response._id,
        product_id: pid,
        quantity: 1,
      };
      const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      let response = await fetch("/api/carts", opts);
      response = await response.json();
      if (response.statusCode === 201) {
        Swal.fire({
          title: response.message,
          icon: "success",
          allowOutsideClick: false,
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          title: response.message,
          icon: "error",
          timer: 3000,
          timerProgressBar: true,
          confirmButtonColor: "#ff3b3c",
          showConfirmButton: false,
        });
      }
    });
  }
};

const initAppDetailProduct = () => {
  productDetailInfo();
  addCart();
};

initAppDetailProduct();
