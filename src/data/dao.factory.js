import argsUtil from "../utils/args/args.util.js";
import { dbConnection } from "../utils/mongo/dbConnection.util.js";

const persistence = argsUtil.persistence;
let dao = {};

switch (persistence) {
  case "fs":
    console.log("connected to file system");
    const { default: productsManagerFs } = await import(
      "./fs/ProductsManager.fs.js"
    );
    const { default: cartsManagerFs } = await import("./fs/CartsManager.fs.js");
    const { default: usersManagerFs } = await import("./fs/UsersManager.fs.js");
    dao = {
      usersManager: usersManagerFs,
      productsManager: productsManagerFs,
      cartsManager: cartsManagerFs,
    };
    break;
  case "memory":
    console.log("connected to memory");
    const { default: productsManagerMemory } = await import(
      "./memory/ProductsManager.memory.js"
    );
    const { default: cartsManagerMemory } = await import(
      "./memory/CartsManager.memory.js"
    );
    const { default: usersManagerMemory } = await import(
      "./memory/UsersManager.memory.js"
    );
    dao = {
      usersManager: usersManagerMemory,
      productsManager: productsManagerMemory,
      cartsManager: cartsManagerMemory,
    };
    break;
  case "mongo":
  default:
    console.log("connected to database");
    dbConnection();
    const { default: productsManagerMongo } = await import(
      "./mongo/ProductsManager.mongo.js"
    );
    const { default: cartsManagerMongo } = await import(
      "./mongo/CartsManager.mongo.js"
    );
    const { default: usersManagerMongo } = await import(
      "./mongo/UsersManager.mongo.js"
    );
    dao = {
      usersManager: usersManagerMongo,
      productsManager: productsManagerMongo,
      cartsManager: cartsManagerMongo,
    };
    break;
}

export default dao;
