// import printNavBar from "./module/printNavOptions.js";

// printNavBar();

async function printNavBar() {
  let template = "";
  let online = await fetch("/api/sessions/online");
  online = await online.json();
  if (online.statusCode === 200) {
    template = `
      <a class="nav-link text-dark p-2" href="/">HOME</a>
      <a class="nav-link text-dark p-2" href="/products/real">Real</a>
      <a class="nav-link text-dark p-2" href="/pages/user.html">Profile</a>
      <a class="nav-link text-dark p-2" href="/pages/cart.html">Carts</a>
      <button class="nav-link text-dark p-2" id="signout">Logout</button>
      `;
    document.querySelector("#navBarOptions").innerHTML = template;
    document.querySelector("#signout").onclick = async () => {
      const url = "/api/sessions/signout";
      const opts = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      };
      let response = await fetch(url, opts);
      response = await response.json();
      console.log(response);
      if (response.statusCode === 200) {
        //location.reload();
        Swal.fire({
          title: response.message,
          icon: "success",
          timer: 5000,
          timerProgressBar: true,
          showConfirmButton: true,
          confirmButtonText: "OK",
        }).then((result) => {
          location.reload();
        });
      }
    };
  } else {
    template = `
      <a class="nav-link text-dark p-2" href="/">HOME</a>
      <a class="nav-link text-dark p-2" href="/products/real">Real</a>
      <a class="nav-link text-dark p-2" href="/pages/register.html">Register</a>
      <a class="nav-link text-dark p-2" href="/pages/login.html">Login</a>
      <a class="nav-link text-dark p-2" href="/api/sessions/google">
        <img src="https://rotulosmatesanz.com/wp-content/uploads/2017/09/2000px-Google_G_Logo.svg_-1024x1024.png" style="bottom: 0; width: 2rem; height: 2rem" alt="Google_logo">
      </a>
      `;
    document.querySelector("#navBarOptions").innerHTML = template;
    location.replace("/");
  }
}

printNavBar();

const template = (data) => {
  return data
    .map((e) => {
      return `        
      <div class="container-modal m-4">      
          
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header border-bottom-0">
          </div>
          <div class="modal-body">
            <table class="table table-image">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Product</th>
                  <th scope="col">Price</th>
                  <th scope="col">Qty</th>
                  
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="w-25">
                    <img src="${e.product_id.photo}" class="img-fluid img-thumbnail m-2" style="width:10rem; height:10rem" alt=${e.product_id._id}>
                  </td>
                  <td>${e.product_id.title}</td>
                  <td class="price">$${e.product_id.price}</td>
                  <td class="qty"><input type="text" class="form-control" id="input1" value=${e.quantity}></td>
                  
                  <td>
                  <button type="button" onclick="destroy('${e._id}')" class="btn btn-danger p-1" id="remove-one">X</button>
                  </td>
                </tr>
              </tbody>
            </table>             
          </div>
          
        </div>
      </div>
    </div>
      `;
    })
    .join("");
};

async function retrieveData() {
  try {
    const response = await fetch("/api/sessions/online");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function cartDataFetch() {
  const data = await retrieveData();
  const url = `/api/carts?user_id=${data.response._id}`;
  const opts = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  let response = await fetch(url, opts);
  response = await response.json();
  console.log(response);
  if (response.statusCode == 404) {
    Swal.fire({
      title: "You have no products on your cart",
      icon: "info",
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: true,
      confirmButtonText: "OK",
    }).then((result) => {
      location.replace("/");
    });
  }
  document.querySelector("#prodsOnCart").innerHTML = template(
    response.response
  );

  return response;
}

async function destroy(cid) {
  try {
    const url = "/api/carts/" + cid;
    const opts = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    let response = await fetch(url, opts);
    response = await response.json();
    location.reload();
  } catch (error) {
    console.log(error);
  }
}

async function destroyAll() {
  try {
    const data = await cartDataFetch();
    console.log(data.response._id);
    console.log(data);
    data.response.forEach((c) => {
      destroy(c._id);
    });
    return data.response;
  } catch (error) {
    throw error;
  }
}

document
  .querySelector("#delete-all")
  .addEventListener("click", async function () {
    // cartsProds = await destroyAll();
    // if (cartsProds.lenght === 0) {
    //   location.reload();
    // }
    // const data = await retrieveData();
    // console.log(data);
    // if (data) {
    //   console.log(data.response._id);
    //   user_id = data.response._id;
    // }
    const url = "/api/carts/all";
    const opts = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({user_id: user_id}),
    };
    const allcarts = await fetch(url, opts);
    console.log(allcarts);
    if (allcarts.status == 200) {
      location.reload();
    }
  });

document.querySelector("#close").addEventListener("click", () => {
  location.replace("/");
});

cartDataFetch();
