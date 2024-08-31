const createNewUser = async () => {
  // Crear el objeto data
  const data = {
    username: document.querySelector("#name").value.trim(),
    email: document.querySelector("#email").value.trim(),
    password: document.querySelector("#password").value.trim(),
    role: document.querySelector("#role").value.trim(),
    photo: document.querySelector("#photo").value.trim(),
  };

  // Filtrar los campos vacíos
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== "")
  );

  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(filteredData),
  };
  let response = await fetch("/api/auth/register", opts);
  response = await response.json();

  if (response.statusCode === 201) {
    Swal.fire({
      title: response.message,
      text: "Now verify your code in your email",
      icon: "success",
      allowOutsideClick: false,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
    }).then(() => {
      Swal.fire({
        title: "Enter your Code (Check your email)",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: "Check",
        showLoaderOnConfirm: true,
        preConfirm: async (code) => {
          try {
            const dataCheck = {
              email: data.email,
              code,
            };
            const checkCodeOpts = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(dataCheck),
            };
            let response = await fetch("/api/auth/verify", checkCodeOpts);
            response = await response.json();

            if (response.statusCode === 400) {
              return Swal.showValidationMessage(`
                ${JSON.stringify(response.message)}
              `);
            }
            return response;
          } catch (error) {
            Swal.showValidationMessage(`Request failed: ${error}`);
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: result.value.message,
            icon: "success",
            allowOutsideClick: false,
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
          }).then(() => {
            document.querySelector("#name").value = "";
            document.querySelector("#email").value = "";
            document.querySelector("#password").value = "";
            document.querySelector("#role").value = "";
            document.querySelector("#photo").value = "";
            location.replace("../users/login.html");
          });
        } else if (result.isDismissed) {
          destroyUser(data.email).then((response) => {
            Swal.fire({
              title: response.message,
              icon: "error",
              timer: 3000,
              timerProgressBar: true,
              confirmButtonColor: "#ff3b3c",
              showConfirmButton: false,
            });
          });
        }
      });
    });
  } else {
    Swal.fire({
      title: response.message,
      icon: "error",
      timer: 5000,
      timerProgressBar: true,
      confirmButtonColor: "#ff3b3c",
      showConfirmButton: false,
    });
  }
};

// Destroy user (not verifyCode)
async function destroyUser(email) {
  const opts = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  };
  let response = await fetch("/api/auth/destroy", opts);
  response = await response.json();
  return response;
}
