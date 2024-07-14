async function printNavBar() {
    let template = "";
    // const opts = {
    //     headers: { token: localStorage.getItem('token') }
    // }
    let online = await fetch("/api/sessions/online"/*, opts*/);
    online = await online.json();
    console.log(online);
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
            const url = '/api/sessions/signout';
            const opts = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
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
                })
                    .then((result) => {
                        location.reload();
                    })
            }
        }
    } else {
        template =
            `
        <a class="nav-link text-dark p-2" href="/">HOME</a>
        <a class="nav-link text-dark p-2" href="/products/real">Real</a>
        <a class="nav-link text-dark p-2" href="/pages/register.html">Register</a>
        <a class="nav-link text-dark p-2" href="/pages/login.html">Login</a>

        `;
        document.querySelector("#navBarOptions").innerHTML = template;
    }
}

export default printNavBar;

{/* <a class="nav-link text-dark p-2" href="/api/sessions/google">
<img src="https://www.svgrepo.com/show/303161/gmail-icon-logo.svg" style="bottom: 0; width: 2rem; height: 2rem" alt="Google_logo">
</a> */}