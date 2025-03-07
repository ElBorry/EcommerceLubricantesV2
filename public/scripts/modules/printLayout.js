export const printIcons = async () => {
  let template = "";
  let online = await fetch("/api/auth");
  online = await online.json();

  if (online.statusCode === 200) {
    template = `
        <a href="../../pages/users/userInfo.html"> <img src="${online.response.photo}" class="h-[35px] w-[35px] mr-6"> </a>
        <a href="../../pages/cart/cart.html"><img src="../../assets/icons/cart.png" alt="Cart"
                        class="h-[35px] w-[35px] mr-6"></a>
        <button id="signout"><img src="../../assets/icons/logout.png" alt="Login"
                        class="h-[35px] w-[35px] mr-6"></button>
        `;
    document.querySelector("#headerIcons").innerHTML = template;
    document.querySelector("#signout").addEventListener("click", async () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, sign me out!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          };
          let response = await fetch("/api/auth/signout", opts);
          response = await response.json();

          if (response.statusCode === 200) {
            location.replace("../../index.html");
          }
        }
      });
    });
  } else {
    template = `
        <a href="../../pages/users/login.html"><img src="../../assets/icons/user-login.png" alt="Login"
                        class="h-[50px] w-[50px] mr-2"></a>
        `;
    document.querySelector("#headerIcons").innerHTML = template;
  }
};
