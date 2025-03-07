import CustomRouter from "../CustomRouter.js";
import { usersRouter } from "./users.api.js";
import { productsRouter } from "./products.api.js";
import { cartsRouter } from "./carts.api.js";
import { ticketsRouter } from "./tickets.api.js";
import authRouter from "./auth.api.js";
import loggerRouter from "./loggers.api.js";

class ApiRouter extends CustomRouter {
  init() {
    this.use("/products", productsRouter);
    this.use("/users", usersRouter);
    this.use("/carts", cartsRouter);
    this.use("/tickets", ticketsRouter);
    this.use("/auth", authRouter);
    this.use("/loggers", loggerRouter);
  }
}

const apiRouter = new ApiRouter();

export default apiRouter.getRouter();
