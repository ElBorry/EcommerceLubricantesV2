import { Router } from "express";
//import Users from "../../data/fs/UserManager.fs.js";
import dao from "../../data/dao.factory.js"
const { users } = dao;

const usersRouter = Router();

usersRouter.get("/register", async (req, res, next) => {
  try {
    return res.render("register", { title: "REGISTER" });
  } catch (error) {
    return next(error);
  }
});

usersRouter.get("/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    //const profile = await Users.readOne(uid);
    const profile = await users.readOne(uid);
    return res.render("profile", { title: "PROFILE", profile });
  } catch (error) {
    return next(error);
  }
});

export default usersRouter;
