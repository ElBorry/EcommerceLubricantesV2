import { printIcons } from "./modules/printLayout.js";

// Elements for pagination buttons
const prevPageButton = document.querySelector("#prevPage");
const nextPageButton = document.querySelector("#nextPage");

// Dynamic Navbar
printIcons();

// Fetch Online Status
let online = await fetch("/api/auth");
online = await online.json();

// Function to create HTML structure for each product
const createProductHTML = (product) => {
  return `
    <div class="w-full h-[350px] rounded-md shadow-xl overflow-hidden">
      <div class="flex flex-col">
        <div class="flex items-end justify-between h-[250px] w-full bg-contain bg-center bg-no-repeat"
             style="background-image: url(${product.photo});">
          <button id="updateProduct"
                  class="p-2 rounded-full bg-white text-white mx-0 mb-2 hover:bg-amber-500 focus:outline-none ">
            <svg fill="#000000" width="50px" height="50px" viewBox="0 0 24 24" id="update" data-name="Line Color" xmlns="http://www.w3.org/2000/svg" class="icon line-color"><path id="primary" d="M4,12A8,8,0,0,1,18.93,8" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path><path id="primary-2" data-name="primary" d="M20,12A8,8,0,0,1,5.07,16" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path><polyline id="secondary" points="14 8 19 8 19 3" style="fill: none; stroke: rgb(44, 169, 188); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></polyline><polyline id="secondary-2" data-name="secondary" points="10 16 5 16 5 21" style="fill: none; stroke: rgb(44, 169, 188); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></polyline></svg>
          </button>
          <button id="deleteProduct"
                  class="p-2 rounded-full bg-white text-white mx-0 mb-2 hover:bg-red-500 focus:outline-none focus:bg-amber-500">
            <svg fill="#000000" width="50px" height="50px" viewBox="0 0 24 24" id="delete" xmlns="http://www.w3.org/2000/svg" class="icon multi-color"><rect id="secondary-fill" x="6" y="7" width="9" height="14" style="fill: rgb(44, 169, 188); stroke-width: 2;"></rect><path id="primary-stroke" d="M4,7H20M16,7V4a1,1,0,0,0-1-1H9A1,1,0,0,0,8,4V7M18,20V7H6V20a1,1,0,0,0,1,1H17A1,1,0,0,0,18,20Z" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path></svg>
          </button>
        </div>
        
        <div class="px-5 py-3 bg-white">
          <h3 class="text-gray-700 uppercase">${product.title}</h3>
          <div class="flex justify-between">
            <span class="text-gray-500 mt-2">$${product.price}</span>
            <span class="underline decoration-sky-500 mt-2">${product.category}</span>
          </div>
        </div>
      </div>
    </div>`;
};

// Function to display products in the container
const showProducts = async (products) => {
  const containerProducts = document.querySelector("#products-container");
  containerProducts.innerHTML = ""; // Clear container before adding new products

  products.forEach((product) => {
    const newDiv = document.createElement("div");
    newDiv.className = `product ${product._id}`;
    newDiv.innerHTML = createProductHTML(product);
    // Add click event listener for updating and deleting product
    newDiv.querySelector("#updateProduct").addEventListener("click", () => {
      console.log("Updating product:", product._id);
    });
    newDiv
      .querySelector("#deleteProduct")
      .addEventListener("click", async () => {
        const opts = {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        };

        let deletePromise = await fetch(`/api/products/${product._id}`, opts);

        deletePromise = await deletePromise.json();
        console.log("Deleting product:", deletePromise);

        if (deletePromise.statusCode === 200) {
          location.replace("../products/productsMe.html");
        }
      });

    // Add click event listener for navigating to product details page
    // newDiv.addEventListener("click", () => {
    //   location.href = `../products/productDetails.html?productId=${product._id}`;
    // });

    // Append the new product to the container
    containerProducts.appendChild(newDiv);
  });
};

// Function to handle pagination and fetch products for the current page
const PageProducts = async () => {
  const url = new URL(window.location.href);
  const page = url.searchParams.get("page") || 1;

  const urlPromise = `/api/products/me?page=${page}`;
  const opts = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "User-ID": online.response?._id || "",
      "User-Role": online.response?.role || "",
    },
  };
  let response = await fetch(urlPromise, opts);

  response = await response.json();

  showProducts(response.response);
  updatePaginationButtons(response.info);
};

// Function to update pagination buttons based on current page info
const updatePaginationButtons = (paginationInfo) => {
  if (paginationInfo.prevPage != null) {
    prevPageButton.innerHTML = `
      <button id="prevPageButton" class="min-w-auto w-32 h-10 bg-red-300 p-2 rounded-xl hover:bg-red-500 transition-colors duration-50 hover:animate-pulse ease-out text-white font-semibold">
        Prev Page
      </button>`;
    prevPageButton
      .querySelector("#prevPageButton")
      .addEventListener("click", () => {
        location.href = `../products/productsMe.html?page=${paginationInfo.prevPage}`;
      });
  } else {
    prevPageButton.innerHTML = ""; // Clear button if no prev page
  }

  if (paginationInfo.nextPage != null) {
    nextPageButton.innerHTML = `
      <button id="nextPageButton" class="min-w-auto w-32 h-10 bg-green-300 p-2 rounded-xl hover:bg-green-500 transition-colors duration-50 hover:animate-pulse ease-out text-white font-semibold">
        Next Page
      </button>`;
    nextPageButton
      .querySelector("#nextPageButton")
      .addEventListener("click", () => {
        location.href = `../products/productsMe.html?page=${paginationInfo.nextPage}`;
      });
  } else {
    nextPageButton.innerHTML = ""; // Clear button if no next page
  }
};

// Load the products when the page is loaded
PageProducts();
