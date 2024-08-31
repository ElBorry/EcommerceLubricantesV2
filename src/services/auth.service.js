import authRepository from "../repositories/auth.rep.js";
import Service from "./CustomService.js";

const authService = new Service(authRepository);
export const { readByEmailService, updateService, destroyService } =
  authService;
