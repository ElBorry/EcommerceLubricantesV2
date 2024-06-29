import printNavBar from "./module/printNavOptions.js";

printNavBar();

document.querySelector("#loginButton").addEventListener("click", login);

async function login() {
  const data = {
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value,
  };
  const url = "/api/sessions/login";
  const opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  let response = await fetch(url, opts);
  response = await response.json();
  if (response.statusCode == 200) {
     Swal.fire({
      title: response.message,
      icon: "success",
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: true,
      confirmButtonText: "OK",
    }).then((result) => {
      location.replace("/");
    });
  } else {
    Swal.fire({
      title: response.message,
      icon: "error",
      timer: 5000,
      timerProgressBar: true,
    });
  }
}
