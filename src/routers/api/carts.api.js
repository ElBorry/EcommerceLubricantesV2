import {
  create,
  destroy,
  destroyAll,
  read,
  readOne,
  update,
} from "../../controllers/carts.controller.js";
import CustomRouter from "../CustomRouter.js";

class CartsRouter extends CustomRouter {
  init() {
    this.create("/", ["USER", "ADMIN"], create);
    this.read("/", ["USER", "ADMIN"], read);
    this.destroy("/all/:uid", ["USER", "ADMIN"], destroyAll);
    this.update("/:cid", ["USER", "ADMIN"], update);
    this.destroy("/:cid", ["USER", "ADMIN"], destroy);
    this.read("/:cid", ["USER", "ADMIN"], readOne);
  }
}

export const cartsRouter = new CartsRouter().getRouter();
