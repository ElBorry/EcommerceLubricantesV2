import CustomRouter from "../CustomRouter.js";
import isTitle from "../../middlewares/isTitle.mid.js";
import {
  create,
  read,
  readOne,
  update,
  destroy,
  paginate,
} from "../../controllers/products.controller.js";

class Products extends CustomRouter {
  init() {
    this.create("/", ["ADMIN"], isTitle, create);
    this.read("/", ["PUBLIC"], read);
    this.read("/paginate", ["PUBLIC"], paginate);
    this.read("/:pid", ["PUBLIC"], readOne);    
    this.update("/:pid", ["ADMIN"], update);
    this.destroy("/:pid", ["ADMIN"], destroy);
  }
}

const productsRouter = new Products();

export default productsRouter.getRouter();
