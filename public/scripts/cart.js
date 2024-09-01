import { printIcons } from "./modules/printLayout.js";

//Fetch Session
let online = await fetch("/api/auth");
online = await online.json();

const userProducts = async () => {
  //Fetch Cart User
  let cartResponse = await fetch(`/api/carts?uid=${online.response._id}`);
  cartResponse = await cartResponse.json();
  let products = cartResponse.response;
  showProducts(products);
  return products;
};

const showProducts = (productsData) => {
  //Container where the products will be seen
  const containerProducts = document.querySelector("#ContainerProducts");
  //Every time new ones are created, the container is emptied
  containerProducts.innerHTML = "";

  productsData.map((product) => {
    //Create a new div
    const newDiv = document.createElement("div");
    //Add a class
    newDiv.className = `product ${product._id} `;
    newDiv.innerHTML = createProductHTML(product);
    //Events to decrement, increment, delete
    //Decrement
    newDiv
      .querySelector("#decrementButton")
      .addEventListener("click", async () => {
        const inputValue = newDiv.querySelector("#quantityProduct");
        if (parseInt(inputValue.value) > 1) {
          inputValue.value = parseInt(inputValue.value) - 1;
          await updateProductQuantity(product._id, inputValue.value);
        }
      });
    //Increment
    newDiv
      .querySelector("#incrementButton")
      .addEventListener("click", async () => {
        const inputValue = newDiv.querySelector("#quantityProduct");
        inputValue.value = parseInt(inputValue.value) + 1;
        await updateProductQuantity(product._id, inputValue.value);
      });
    //Delete
    newDiv
      .querySelector("#deleteProduct")
      .addEventListener("click", async () => {
        const opts = {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        };
        let response = await fetch(`/api/carts/${product._id}`, opts);
        response = await response.json();

        if (response.statusCode === 200) {
          Swal.fire({
            title: response.message,
            icon: "success",
            allowOutsideClick: false,
            timer: 500,
            timerProgressBar: true,
            showConfirmButton: false,
          }).then(() => {
            location.reload("/");
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
    //Append to the container
    containerProducts.appendChild(newDiv);
  });
};

const updateProductQuantity = async (cid, quantity) => {
  await fetch(`/api/carts/${cid}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cid, quantity }),
  });
  location.reload("/");
};

const createProductHTML = (product) => {
  const template = `
        <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            <img src="${product.product_id.photo}"
                alt="product-image" class="w-full rounded-lg sm:w-40" />
            <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div class="mt-5 sm:mt-0">
                    <h2 class="text-lg font-bold text-gray-900">${product.product_id.title}</h2>
                    <p class="mt-1 text-xl text-gray-700">$${product.product_id.price}</p>
                </div>
                <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div class="flex items-center border-gray-100">
                        <span id="decrementButton" class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-amber-500 hover:text-amber-50">
                            - </span>
                        <input class="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value="${product.quantity}" min="1" id="quantityProduct" />
                        <span id="incrementButton" class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-amber-500 hover:text-amber-50">
                            + </span>
                    </div>
                    <button id="deleteProduct" class="flex items-center  justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor"
                            class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

        </div>
    `;
  return template;
};

const checkoutButton = document.getElementById("checkout-button");

checkoutButton.addEventListener("click", async () => {
  try {
    const optsTicket = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };

    let promise = await fetch(
      `/api/tickets/${online.response._id}`,
      optsTicket
    );

    const opts = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    await fetch(`/api/carts/all/${online.response._id}`, opts);

    promise = await promise.json();

    Swal.fire({
      title: promise.message,
      icon: "success",
      allowOutsideClick: false,
      timer: 1000,
      timerProgressBar: true,
      showConfirmButton: false,
    }).then(() => {
      location.replace("../../index.html");
    });
  } catch (error) {
    console.error("Error checking out:", error);
  }
});

const clearButton = document.getElementById("clearChopping");

clearButton.addEventListener("click", async () => {
  try {
    const opts = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    let promise = await fetch(`/api/carts/all/${online.response._id}`, opts);

    promise = await promise.json();

    Swal.fire({
      title: promise.message,
      icon: "success",
      allowOutsideClick: false,
      timer: 1300,
      timerProgressBar: true,
      showConfirmButton: false,
    }).then(() => {
      location.reload("/");
    });
  } catch (error) {
    console.error("Error checking out:", error);
  }
});

const totalCart = async () => {
  if (online.statusCode === 200) {
    const opts = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    let totalResponse = await fetch(
      `/api/tickets/${online.response._id}`,
      opts
    );
    totalResponse = await totalResponse.json();
    document.getElementById("subtotal").innerHTML =
      "$ " + totalResponse.response[0].subTotal + " USD";
    document.getElementById("total").innerHTML =
      "$ " + totalResponse.response[0].total + " USD";
  }
};

const initAppCart = () => {
  printIcons();
  userProducts();
  totalCart();
};

initAppCart();
