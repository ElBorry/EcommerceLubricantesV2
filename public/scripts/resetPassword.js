const sendCode = async () => {
  const email = document.getElementById("emailReset").value.trim();

  // Validate email using a basic regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    // Show error message and prevent form submission
    document.getElementById("emailError").classList.remove("hidden");
  } else {
    // Hide error message if email is valid
    document.getElementById("emailError").classList.add("hidden");
  }

  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  };
  let response = await fetch("/api/auth/password", opts);
  response = await response.json();
  if (response.statusCode === 200) {
    Swal.fire({
      position: "center",
      icon: "success",
      text: response.message,
      showConfirmButton: false,
      timer: 1500,
      allowOutsideClick: false,
      timerProgressBar: true,
    }).then(() => {
      Swal.fire({
        title: "Enter your Code (Check your email)",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },

        showLoaderOnConfirm: true,
        allowOutsideClick: false,

        confirmButtonText: "Check",
        confirmButtonColor: "#3085d6",

        showCancelButton: true,
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancel!",

        preConfirm: async (code) => {
          try {
            const dataCheck = {
              email: email,
              code,
            };
            const checkCodeOpts = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(dataCheck),
            };
            let response = await fetch("/api/auth/verifyCode", checkCodeOpts);
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
      }).then((result) => {
        if (result.isConfirmed && result.value.statusCode === 200) {
          document
            .getElementById("itemChangePassword")
            .classList.add("xl:grid-cols-2");
          document.getElementById("separator1").classList.add("xl:block");
          document.getElementById("separator1").classList.add("xl:h-full");
          document.getElementById("separator1").classList.add("bg-white");
          document.getElementById("separator1").classList.add("ml-6");
          document.getElementById("emailReset").classList.remove("xl:w-[60%]");
          document.getElementById("emailReset").classList.add("xl:w-full");

          Swal.fire({
            position: "center",
            icon: "success",
            title: result.value.message,
            showConfirmButton: false,
            timer: 1500,
            allowOutsideClick: false,
            timerProgressBar: true,
          }).then(() => {
            updatePassword();
          });
        } else if (result.isDismissed || result.value.statusCode == 400) {
          document
            .getElementById("itemChangePassword")
            .classList.remove("xl:grid-cols-2");
          document.getElementById("separator1").classList.remove("xl:block");
          document.getElementById("separator1").classList.remove("xl:h-full");
          document.getElementById("separator1").classList.remove("bg-white");
          document.getElementById("separator1").classList.remove("ml-6");

          Swal.fire({
            position: "center",
            icon: "error",
            title: "Oops...",
            text: "Error, try again",
            showConfirmButton: false,
            timer: 1500,
            allowOutsideClick: false,
            timerProgressBar: true,
          });
        }
      });
    });
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: response.message,
      showConfirmButton: false,
      timer: 1500,
      allowOutsideClick: false,
      timerProgressBar: true,
    });
  }
};

const updatePassword = () => {
  document.getElementById("infoNewPassword").classList.remove("hidden");

  const inputEmail = document.getElementById("emailReset");
  inputEmail.disabled = true;

  const buttonSendCode = document.getElementById("emailResetButton");
  buttonSendCode.disabled = true;

  const inputNewPassword1 = document.getElementById("passwordN1");
  const inputNewPassword2 = document.getElementById("passwordN2");

  validatePassword = () => {
    const password1 = inputNewPassword1.value.trim();
    const password2 = inputNewPassword2.value.trim();

    if (
      password1 === password2 &&
      password1.length > 4 &&
      password2.length > 4
    ) {
      document
        .getElementById("buttonChangePassword")
        .classList.remove("hidden");
      document.getElementById("passwordError").classList.add("hidden");
    } else {
      document.getElementById("buttonChangePassword").classList.add("hidden");
      document.getElementById("passwordError").classList.remove("hidden");
    }
  };

  // Add an event listener to listen for changes to inputNewPassword1
  inputNewPassword1.addEventListener("input", validatePassword);
  // Add an event listener to listen for changes to inputNewPassword2
  inputNewPassword2.addEventListener("input", validatePassword);
};

const newPasswordChange = async () => {
  const email = document.getElementById("emailReset").value.trim();
  const newPassword = document.getElementById("passwordN2").value.trim();

  const data = {
    email: email,
    password: newPassword,
  };

  const opts = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  let response = await fetch("/api/auth/password", opts);
  response = await response.json();
  console.log(response);
  if (response.statusCode === 200) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: response.message,
      showConfirmButton: false,
      timer: 1500,
      allowOutsideClick: false,
      timerProgressBar: true,
    }).then(() => {
      document.getElementById("passwordN1").value = "";
      document.getElementById("passwordN2").value = "";
      location.replace("../../index.html");
    });
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: response.message,
      showConfirmButton: false,
      timer: 1500,
      allowOutsideClick: false,
      timerProgressBar: true,
    });
  }
};
