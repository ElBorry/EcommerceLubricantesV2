import Service from "./service.js";
//import productManager from "../data/mongo/managers/ProductsManager.mongo.js";
// import productManager from "../data/fs/ProductManager.fs.js";
// import productManager from "../data/memory/ProductManager.memory.js";
import productsRepository from "../repositories/products.rep.js"

const productsService = new Service(productsRepository);
export const {
  createService,
  readService,
  paginateService,
  readOneService,
  updateService,
  destroyService,
} = productsService;
