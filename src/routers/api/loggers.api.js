import logsMessages from "../../controllers/loggers.controller.js";
import CustomRouter from "../CustomRouter.js";

class LoggerRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], logsMessages);
  }
}

const loggerRouter = new LoggerRouter().getRouter();
export default loggerRouter;
