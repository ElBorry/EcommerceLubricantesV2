import { checkMandatoryFieldsUsers } from "../../middlewares/checkMandatoryFieldsUsers.mid.js";
import CustomRouter from "../CustomRouter.js";
import {
  create,
  destroy,
  read,
  readOne,
  update,
} from "../../controllers/users.controller.js";

class UsersRouter extends CustomRouter {
  init() {
    this.create("/", ["PUBLIC"], checkMandatoryFieldsUsers, create);
    this.read("/", ["ADMIN"], read);
    this.read("/:uid", ["USER", "ADMIN"], readOne);
    this.update("/:uid", ["ADMIN"], update);
    this.destroy("/:uid", ["ADMIN"], destroy);
  }
}

export const usersRouter = new UsersRouter().getRouter();
