import printNavBar from "./module/printNavOptions.js";

printNavBar();

document.querySelector("#registration").addEventListener("click", register);

async function register() {
  const data = {
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value,
    photo: document.querySelector("#photo").value || "https://blog.hubspot.es/hubfs/Co%CC%81mo%20hacer%20una%20marca%20personal.jpg",
    role: document.querySelector("#role").value || 0,
  };

  const url = "/api/sessions/register";
  const opts = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  let response = await fetch(url, opts);
  response = await response.json();
  console.log(response.statusCode);
  if (response.statusCode == 201) {
    Swal.fire({
      title: response.message,
      icon: "success",
      timer: 5000,
      timerProgressBar: true,
      showConfirmButton: true,
      confirmButtonText: "OK",
    }).then((result) => {
      location.replace("/pages/login.html");
    });
  } else {
    return Swal.fire({
      title: response.message,
      icon: "error",
      timer: 5000,
      timerProgressBar: true,
    });
  }
}
