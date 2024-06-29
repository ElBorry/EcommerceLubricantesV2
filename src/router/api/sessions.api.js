import passport from "../../middlewares/passport.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import CustomRouter from "../CustomRouter.js";
import { login, register, online, signout, google } from "../../controllers/sessions.controller.js";

class SessionRouter extends CustomRouter {
  init() {
    this.create("/register", ["PUBLIC"], passportCb("register"), register);
    this.create("/signout", ["USER", "ADMIN"], passportCb("jwt"), signout);
    this.create("/login", ["PUBLIC"], passportCb("login"), login);
    this.read("/online", ["USER", "ADMIN"], passportCb("jwt"), online);    
    this.read(
      "/google",
      ["PUBLIC"],
      passport.authenticate("google", { scope: ["email", "profile"] })
    );
    this.read(
      "/google/callback",
      ["PUBLIC"],
      passport.authenticate("google", { session: false, failureRedirect: "/" }),
      google
    );
  }
}

const sessionsRouter = new SessionRouter();
export default sessionsRouter.getRouter();
