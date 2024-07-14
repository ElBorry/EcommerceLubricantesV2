import Service from "./service.js";
//import cartManager from "../data/mongo/managers/CartsManager.mongo.js";
//import cartManager from "../data/fs/CartManager.fs.js";
//import cartManager from "../data/memory/CartManager.memory.js";
import cartsRepository from "../repositories/carts.rep.js";

const cartsService = new Service(cartsRepository);
export const {
  createService,
  readService,
  updateService,
  destroyService,
  readOneService,
  destroyAllService,
  aggregateService,
} = cartsService;
