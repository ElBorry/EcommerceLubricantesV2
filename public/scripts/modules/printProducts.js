export const productsAll = async (products) => {
  //Container where the products will be seen
  const containerProducts = document.querySelector("#ContainerProducts");
  ////Every time new ones are created, the container is emptied
  containerProducts.innerHTML = "";

  products.map(async (product) => {
    //Create a new div
    const newDiv = document.createElement("div");
    //Add a class
    newDiv.className = `product ${product._id} `;
    newDiv.innerHTML = createProductHTML(product);
    containerProducts.appendChild(newDiv);

    let template = "";
    let online = await fetch("/api/auth");
    online = await online.json();
    if (online.statusCode === 200) {
      template = `
                <button id="addProduct"
                    class="p-2 rounded-full bg-amber-600 text-white mx-5 mb-2 hover:bg-amber-500 focus:outline-none focus:bg-amber-500">
                    <svg class="h-10 w-10" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z">
                        </path>
                    </svg>
                </button>
            `;
      newDiv.querySelector("#addCartButton").innerHTML = template;
      newDiv
        .querySelector("#addProduct")
        .addEventListener("click", async () => {
          const data = {
            user_id: online.response._id,
            product_id: product._id,
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
              timer: 1000,
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
    newDiv
      .querySelector("#infoProduct")
      .addEventListener("click", () => detailProduct(product._id));
  });
};

const createProductHTML = (product) => {
  const template = `
                <div class="w-full h-[350px] rounded-md shadow-xl overflow-hidden" >
                    <div class="flex flex-col">
                        <div class=" flex items-end justify-end h-[250px] w-full bg-contain bg-center bg-no-repeat"
                            style="background-image: url(${`${product.photo}`});">
                            <div id="addCartButton"></div>
                            <button id="infoProduct"
                                class="p-2 rounded-full bg-white text-white mx-0 mb-2 hover:bg-red-500 focus:outline-none focus:bg-amber-500">
                                <svg class="h-10 w-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.95043 20.6471C6.17301 19.9956 4.00437 17.827 3.35287 15.0496C2.88237 13.0437 2.88237 10.9563 3.35287 8.95043C4.00437 6.17301 6.17301 4.00437 8.95043 3.35288C10.9563 2.88237 13.0437 2.88237 15.0496 3.35287C17.827 4.00437 19.9956 6.173 20.6471 8.95043C21.1176 10.9563 21.1176 13.0437 20.6471 15.0496C19.9956 17.827 17.827 19.9956 15.0496 20.6471C13.0437 21.1176 10.9563 21.1176 8.95043 20.6471Z" stroke="#0095FF" stroke-width="1.5" />
                                    <path d="M8.95043 20.6471C10.9563 21.1176 13.0437 21.1176 15.0496 20.6471C17.827 19.9956 19.9956 17.827 20.6471 15.0496C21.1176 13.0437 21.1176 10.9563 20.6471 8.95043C19.9956 6.173 17.827 4.00437 15.0496 3.35288C13.0437 2.88237 10.9563 2.88237 8.95043 3.35288C6.173 4.00437 4.00437 6.17301 3.35287 8.95043" stroke="#363853" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M12 15.5V11.5" stroke="#0095FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <circle cx="12" cy="9" r="0.5" stroke="#0095FF" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </button>
                        </div>

                        <div class="px-5 py-3 bg-white">
                            <h3 class="text-gray-700 uppercase">${
                              product.title
                            }</h3>
                            <div class="flex justify-between">
                            <span class="text-gray-500 mt-2">$${
                              product.price
                            }</span>
                            <span class="underline decoration-sky-500 mt-2">${
                              product.category
                            }</span>
                            </div>
                        </div>
                    </div>
        </ > `;
  return template;
};

const detailProduct = (productId) => {
  location.href = `../../pages/products/product-detail.html?pid=${productId}`;
};
