import CustomRouter from "../CustomRouter.js";
import { create, sumTotal, read } from "../../controllers/tickets.controller.js";

class TicketsRouter extends CustomRouter {
  init() {
    this.read("/:uid", ["USER", "ADMIN"], sumTotal);
    this.create("/:uid", ["USER", "ADMIN"], create);
    this.read("/user/:uid", ["USER", "ADMIN"], read);
  }
}

export default new TicketsRouter().getRouter();
