import { checkMandatoryFieldsProducts } from "../../middlewares/checkMandatoryFieldsProducts.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import CustomRouter from "../CustomRouter.js";
import {
  create,
  destroy,
  paginateRead,
  read,
  readOne,
  update,
  paginateManage,
} from "../../controllers/products.controller.js";
import authorizationManagement from "../../middlewares/authorization.mid.js";

class ProductsRouter extends CustomRouter {
  init() {
    this.create("/", ["ADMIN", "PREMIUM"], passportCb("jwt"), create);
    this.read("/", ["PUBLIC"], read);
    this.read("/me", ["ADMIN", "PREMIUM"], paginateManage);
    this.read("/paginate", ["PUBLIC"], paginateRead);
    this.read("/:pid", ["PUBLIC"], readOne);
    this.update(
      "/:pid",
      ["ADMIN", "PREMIUM"],
      passportCb("jwt"),
      authorizationManagement,
      update
    );
    this.destroy("/:pid", ["ADMIN", "PREMIUM"], destroy);
  }
}

export const productsRouter = new ProductsRouter().getRouter();
