import usersRepository from "../repositories/users.rep.js";
import Service from "./CustomService.js";

const userService = new Service(usersRepository);
export const {
  createService,
  readService,
  readOneService,
  updateService,
  destroyService,
} = userService;
