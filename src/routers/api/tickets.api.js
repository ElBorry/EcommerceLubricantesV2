import CustomRouter from "../CustomRouter.js";
import { create, sumTotal } from "../../controllers/tickets.controller.js";

class TicketsRouter extends CustomRouter {
  init() {
    this.read("/:uid", ["USER", "ADMIN"], sumTotal);
    this.create("/:uid", ["USER", "ADMIN"], create);
  }
}

export const ticketsRouter = new TicketsRouter().getRouter();
