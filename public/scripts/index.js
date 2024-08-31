import { printIcons } from "./modules/printLayout.js";
import { productsAll } from "./modules/printProducts.js";

const searchInput = document.querySelector("#searchInfo");
const prevPageButton = document.querySelector("#prevPage");
const nextPageButton = document.querySelector("#nextPage");
const clearInput = document.querySelector("#clearFilter");

const handleClearFilter = () => {
  location.href = "../index.html";
};

const handleSearchInput = (event) => {
  const userInput = event.target.value;
  PageProducts(userInput);
};

//Fetch Session
let online = await fetch("/api/auth");
online = await online.json();

searchInput.addEventListener("keyup", handleSearchInput);
clearInput.addEventListener("click", handleClearFilter);

const PageProducts = async (filterText) => {
  //Get Page Products
  let url = new URL(window.location.href);
  let page = url.searchParams.get("page") || 1;
  let filter = url.searchParams.get("title") || filterText;

  document.querySelector("#searchInfo").value = filter;

  const urlPromise = `/api/products/paginate?page=${page}&title=${filter}`;
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

  let products = response.response;
  productsAll(products);

  updatePaginationButtons(response.info, filter);
};

const updatePaginationButtons = (paginationInfo, filter) => {
  if (paginationInfo.prevPage) {
    prevPageButton.innerHTML = `
          <button id="prevPageButton" class="min-w-auto w-32 h-10 bg-yellow-300 p-2 rounded-xl hover:bg-yellow-500 transition-colors duration-50 hover:animate-pulse ease-out text-white font-semibold">
            Prev Page
          </button>
        `;
    prevPageButton
      .querySelector("#prevPageButton")
      .addEventListener("click", () => {
        location.href = `../index.html?page=${paginationInfo.prevPage}&title=${filter}`;
      });
  } else {
    prevPageButton.innerHTML = ""; // clear button if no prev page
  }

  if (paginationInfo.nextPage) {
    nextPageButton.innerHTML = `
          <button id="nextPageButton" class="min-w-auto w-32 h-10 bg-red-300 p-2 rounded-xl hover:bg-red-500 transition-colors duration-50 hover:animate-pulse ease-out text-white font-semibold">
            Next Page
          </button>
        `;
    nextPageButton
      .querySelector("#nextPageButton")
      .addEventListener("click", () => {
        location.href = `../index.html?page=${paginationInfo.nextPage}&title=${filter}`;
      });
  } else {
    nextPageButton.innerHTML = ""; // clear button if no next page
  }
};

const initAppIndex = () => {
  printIcons();
  PageProducts("");
};

initAppIndex();
