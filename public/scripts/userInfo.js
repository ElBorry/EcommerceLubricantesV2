import { printIcons } from "./modules/printLayout.js";

//Get User ID from Params
let online = await fetch("/api/auth");
online = await online.json();

const detailInfoUser = async () => {
  let user;

  let response = await fetch(`/api/users/${online.response._id}`);
  let data = await response.json();
  console.log(data);

  user = data.response;

  const imgUser = document.querySelector("#img-user");
  imgUser.src = user.photo;
  document.getElementById("email-user").innerHTML = "Email:" + user.email;
  document.getElementById("username").innerHTML = user.username;
  document.getElementById("password-user").innerHTML =
    "Password:" + user.password;
  document.getElementById("role-user").innerHTML = "Role:" + user.role;
};

const initAppUserInfo = () => {
  printIcons();
  detailInfoUser();
};

initAppUserInfo();
