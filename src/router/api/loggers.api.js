import logsMessages from "../../controllers/loggers.controller.js";
import CustomRouter from "../CustomRouter.js";

class LoggerRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], logsMessages); // Verifica que `logsMessages` sea una función correcta
  }
}

export default new LoggerRouter().getRouter(); // Exporta el router correctamente
