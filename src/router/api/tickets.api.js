import { read } from "../../controllers/tickets.controller.js";
import CustomRouter from "../CustomRouter.js";
import passportCb from "../../middlewares/passportCb.mid.js";

class TicketsRouter extends CustomRouter {
  init() {
    this.read("/", ["USER", "ADMIN"], passportCb("jwt"), read);
  }
}

const ticketsRouter = new TicketsRouter();
export default ticketsRouter.getRouter();
