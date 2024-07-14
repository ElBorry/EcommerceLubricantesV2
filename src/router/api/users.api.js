import CustomRouter from "../CustomRouter.js";
import {
  create,
  read,
  readOne,
  update,
  destroy,
} from "../../controllers/users.controller.js";
import isValidData from "../../middlewares/isValidData.mid.js";
class UsersRouter extends CustomRouter {
  init() {
    this.create("/", /*["ADMIN"]*/ ["PUBLIC"], isValidData, create);
    this.read("/", ["PUBLIC"], read);
    this.read("/:uid", ["PUBLIC"], readOne);
    this.update("/:uid", ["PUBLIC"] /*["ADMIN"]*/, update);
    this.destroy("/:uid", ["PUBLIC"] /*["ADMIN"]*/, destroy);
  }
}

const usersRouter = new UsersRouter();
export default usersRouter.getRouter();
