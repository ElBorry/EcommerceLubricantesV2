import printNavBar from "./module/printNavOptions.js";

printNavBar();

const template = (data) => {
  return `
        <h3 class="m-2 p-2 text-center">EMAIL: ${data.response.email}</h3>
        <h5 class="m-2 p-2 text-center">ROLE: ${data.response.role}</h5>
        <img style="width: 360px; height: 360px" class="m-2 object-fit-cover" src="${data.response.photo}"/>
        `;
};

async function retrieveData() {
  try {
    const response = await fetch("/api/sessions/online");
    const data = await response.json();
    //console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function userDataFetch() {
  const data = await retrieveData();
  console.log(data);
  if (data.statusCode === 401) {
    Swal.fire({
      title: "User not logged in",
      icon: "error",
      // timer: 5000,
      // timerProgressBar: true,
      showConfirmButton: true,
      confirmButtonText: "OK",
    }).then((result) => {
      window.location.href = "/";
    });
  } else {
    const url = `/api/users/${data.response._id}`;
    const opts = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    let response = await fetch(url, opts);
    response = await response.json();
    console.log(response);
    if (
      response.statusCode === 404 ||
      response.statusCode === 401 ||
      response.statusCode === 500
    ) {
      Swal.fire({
        title: "User not logged in",
        icon: "error",
        // timer: 5000,
        // timerProgressBar: true,
        showConfirmButton: true,
        confirmButtonText: "OK",
      }).then((result) => {
        window.location.href = "/";
      });
    }
    document.querySelector("#sectionUser").innerHTML = template(response);
  }
}

userDataFetch();
