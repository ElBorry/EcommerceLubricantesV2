import Products from "../data/fs/ProductManager.fs.js";
import Users from "../data/fs/UserManager.fs.js";
import productManager from "../data/mongo/managers/ProductsManager.mongo.js";
import UserManager from "../data/mongo/managers/UsersManager.mongo.js"

const messages = [];

export default async (socket) => {
  console.log(`client ID ${socket.id} connected`);
  socket.emit("products", await productManager.read());
  socket.on("new_product", async (data) => {
    await productManager.create(data);
    socket.emit("products", await productManager.read());
  });
  socket.on("registration", async (data) => {
    await UserManager.create(data);
    console.log(data);
    socket.emit("users", await UserManager.read());
  });

  socket.on("nickname", async (data) => {
    messages.push(data + "is connected");
    socket.emit("new user", messages);
  })
};
