import productsRepository from "../repositories/products.rep.js";
import Service from "./CustomService.js";

const productsService = new Service(productsRepository);
export const {
  createService,
  readService,
  readOneService,
  updateService,
  destroyService,
  paginateService,
} = productsService;
