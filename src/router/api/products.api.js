import { checkMandatoryFieldsProducts } from "../../middlewares/checkMandatoryFieldsProducts.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import CustomRouter from "../CustomRouter.js";
import {
  create,
  destroy,
  paginate,
  read,
  readOne,
  update,
} from "../../controllers/products.controller.js";

class ProductsRouter extends CustomRouter {
  init() {
    this.create(
      "/",
      ["ADMIN"],
      passportCb("jwt"),
      checkMandatoryFieldsProducts,
      create
    );
    this.read("/", ["PUBLIC"], read);
    this.read("/paginate", ["PUBLIC"], paginate);
    this.read("/:pid", ["PUBLIC"], readOne);
    this.update("/:pid", ["ADMIN"], update);
    this.destroy("/:pid", ["ADMIN"], destroy);
  }
}

export default new ProductsRouter().getRouter();
