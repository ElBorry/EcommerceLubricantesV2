// src/router/api/tickets.api.js
import CustomRouter from "../CustomRouter.js";
import { create, sumTotal, read } from "../../controllers/tickets.controller.js";

class TicketsRouter extends CustomRouter {
  init() {
    this.read("/:uid", ["USER", "ADMIN"], sumTotal); // Endpoint para sumTotal
    this.create("/:uid", ["USER", "ADMIN"], create); // Endpoint para create
    this.read("/user/:uid", ["USER", "ADMIN"], read); // Endpoint para read
  }
}

export const ticketsRouter = new TicketsRouter().getRouter();
