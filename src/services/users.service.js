import Service from "./service.js";
//import userManager from "../data/mongo/managers/UsersManager.mongo.js";
//import userManager from "../data/memory/UserManager.memory.js";
// import userManager from "../data/fs/UserManager.fs.js";
import usersRepository from "../repositories/users.rep.js";

const usersService = new Service(usersRepository);
export const {
  createService,
  readService,
  readOneService,
  updateService,
  destroyService,
} = usersService;

