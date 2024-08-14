import argsUtil from "../utils/args/args.util.js";
import dbConnect from "../utils/mongo/dbConnection.util.js";

const persistence = argsUtil.persistence;
let dao = {};

switch (persistence) {
  case "memory":
    console.log("connected to memory");
    const { default: userManagerMem } = await import(
      "./memory/UserManager.memory.js"
    );
    const { default: productManagerMem } = await import(
      "./memory/ProductManager.memory.js"
    );
    const { default: cartManagerMem } = await import(
      "./memory/CartManager.memory.js"
    );
    dao = {
      users: userManagerMem,
      products: productManagerMem,
      carts: cartManagerMem,
    };
    break;
  case "fs":
    console.log("connected to fs");
    const { default: userManagerFs } = await import("./fs/UserManager.fs.js");
    const { default: productManagerFs } = await import(
      "./fs/ProductManager.fs.js"
    );
    const { default: cartManagerFs } = await import("./fs/CartManager.fs.js");
    dao = {
      users: userManagerFs,
      products: productManagerFs,
      carts: cartManagerFs,
    };
    break;
  default:
    //MONGO
    dbConnect();
    const { default: productManagerMongo } = await import(
      "./mongo/managers/ProductsManager.mongo.js"
    );
    const { default: cartManagerMongo } = await import(
      "./mongo/managers/CartsManager.mongo.js"
    );
    const { default: userManagerMongo } = await import(
      "./mongo/managers/UsersManager.mongo.js"
    );
    dao = {
      users: userManagerMongo,
      products: productManagerMongo,
      carts: cartManagerMongo,
    };
    break;
}

export default dao;
