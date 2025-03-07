import cartsRepository from "../repositories/carts.rep.js";
import Service from "./CustomService.js";

const cartsService = new Service(cartsRepository);
export const {
  createService,
  readService,
  readOneService,
  updateService,
  destroyService,
  destroyAllService,
} = cartsService;
