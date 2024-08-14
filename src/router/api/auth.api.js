import {
  login,
  register,
  online,
  signout,
  verifyCode,
  destroyUser,
  onlineCode,
  resetPassword,
  updatePassword,
} from "../../controllers/auth.controller.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import CustomRouter from "../CustomRouter.js";

class AuthRouter extends CustomRouter {
  init() {
    this.create("/register", ["PUBLIC"], passportCb("register"), register);
    this.create("/login", ["PUBLIC"], passportCb("login"), login);
    this.read("/", ["USER", "ADMIN"], online);
    this.create("/signout", ["USER", "ADMIN"], signout);
    this.create("/verify", ["PUBLIC"], verifyCode);
    this.destroy("/destroy", ["PUBLIC"], destroyUser);
    this.create("/verifyCode", ["PUBLIC"], onlineCode);
    this.create("/password", ["PUBLIC"], resetPassword);
    this.update("/password", ["PUBLIC"], updatePassword);
  }
}

const authRouter = new AuthRouter().getRouter();
export default authRouter;
