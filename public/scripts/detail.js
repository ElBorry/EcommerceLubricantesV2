import printNavBar from "./module/printNavOptions.js";

printNavBar();

const urlParams = new URL(location.href);
const pid = urlParams.searchParams.get("id");
const addButton = document.getElementById("incrementBtn");
const decButton = document.getElementById("decrementBtn");
const itemCount = document.getElementById("itemCount");
const addCart = document.getElementById("addCart");
let quant = 1;
let prod = {};
let user_id = "";

function retrieveData() {
  fetch("/api/products/" + pid)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error al cargar los datos");
      }
      return res.json();
    })
    .then((data) => {
      prod = data;
      document.querySelector("#detail").innerHTML = `
              <h4 class="m-2">${data.response.title}</h4>
              <img class="mx-auto" style="width: 12rem; height: 15rem" src="${data.response.photo}" alt="${data.response._id}" />
              <p class="m-2">Precio:${data.response.price}</p>
              <p>Stock: ${data.response.stock}</p>
`;
    })
    .catch((err) => {
      console.log(err);
    });
}

retrieveData();

const draw = () => {
  itemCount.innerHTML = "";
  itemCount.innerHTML += `
        <p>${quant}</p>
    `;
};

addButton.addEventListener("click", () => {
  if (quant < prod.response.stock) {
    quant++;
  }
  draw();
});

decButton.addEventListener("click", () => {
  if (quant) {
    quant--;
  }
  draw();
});

addCart.addEventListener("click", async () => {
  let carts = [];
  const response = await fetch("/api/sessions/online");
  const data = await response.json();
  
  //user_id = logData.user_id;
  // 1 - Leer los carts de ese usuario
  // fetch("/api/carts?user_id=6630246a6d3d844262c48d0b")
  //   .then((res) => {
  //     if (!res.ok) {
  //       throw new Error("Error al cargar los datos");
  //     }
  //     return res.json();
  //   })
  //   .then((resp) => {
  //     console.log(resp.response);
  //     carts = resp.response;
  //     console.log(carts);

  //     const cart_found = carts.map((e) => {
  //       return e.product_id._id === pid;
  //     })
  //     if (cart_found.length > 0) {
  //       console.log("Cart found:" + cart_found);
  //     } else {
  //       console.log("Cart not found");
  //     }
  //   })
  //   .catch((err) => console.log(err));
  console.log(prod.response);
  console.log(data.statusCode);
  if (data.statusCode === 200) {
    user_id = data.response._id;
    addCartfunc(prod.response._id);
  } else {
    Swal.fire({
      title: "Information",
      text: "You must be logged in to add products to cart",
      showConfirmButton: true,
      confirmButtonText: "OK",
      timerProgressBar: true,
      timer: 2000,
    }).then((result) => {
      location.replace("/");
    });
  }
});

async function addCartfunc(pid) {
  try {
    const data = {
      user_id: user_id,
      product_id: pid,
      quantity: quant,
    };
    console.log(data);
    const url = "/api/carts";
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    let response = await fetch(url, opts);
    response = await response.json();

    setTimeout(() => {
      Swal.fire({
        title: "Information",
        text: "Product added successfully to cart",
        showConfirmButton: true,
        confirmButtonText: "OK",
        timerProgressBar: true,
        timer: 2000,
      }).then((result) => {
        location.replace("/pages/cart.html");
      });
    }, 1000);
  } catch (error) {
    console.log(error);
  }
}

draw();
