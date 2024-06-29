import printNavBar from "./module/printNavOptions.js";

printNavBar();

if (window.location.search.includes('success=true')) {
    Swal.fire({
        title: 'Login Successful!',
        text: 'You have been successfully logged in with Google.',
        icon: 'success',
        confirmButtonText: 'OK'
    }).then((result) => {
        location.replace("/");
    })
}

