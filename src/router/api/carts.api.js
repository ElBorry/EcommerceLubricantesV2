import CustomRouter from "../CustomRouter.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import {
  create,
  read,
  readOne,
  update,
  destroyAll,
  destroy,
} from "../../controllers/carts.controller.js";

class Carts extends CustomRouter {
  init() {
    this.create("/", ["USER", "ADMIN"], create);
    this.read("/", ["USER", "ADMIN"], read);
    this.read("/:cid", ["USER", "ADMIN"], readOne);
    this.update("/:cid", ["USER", "ADMIN"], update);
    // this.destroy(
    //   "/all",
    //   ["USER", "ADMIN"],
    //   passportCb("jwt", { session: false }),
    //   destroyAll
    // );
    this.destroy("/:cid", ["USER", "ADMIN"], destroy);
  }
}

const cartsRouter = new Carts();
export default cartsRouter.getRouter();
