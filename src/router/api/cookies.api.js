import { Router } from "express";

const cookiesRouter = Router();

cookiesRouter.get("/set", (req, res, next) => {
  try {
    return res
      .cookie("modo", "nocturno", { maxAge: 10000 })
      .cookie("otra", "cookie nueva", { maxAge: 60000 })
      .cookie("online", "true", { maxAge: 1000 * 60 * 60 })
      .json({ message: "La cookie vence en 10 segundos" });
  } catch (error) {
    return next(error);
  }
});

cookiesRouter.get("/", (req, res, next) => {
  try {
    const online = req.cookies.online;
    return res.json({
      cookies: req.cookies,
      online,
    });
  } catch (error) {
    return next(error);
  }
});

cookiesRouter.get("/destroy/:cookie", async (req, res, next) => {
  try {
    const { cookie } = req.params;
    return res
      .clearCookie(cookie)
      .json({ message: `cookie ${cookie} was successfully deleted` });
  } catch (error) {
    return next(error);
  }
});

cookiesRouter.get("/signed", (req, res, next) => {
  try {
    return res
      .cookie("role", "admin", { signed: true })
      .json({ message: "cookie signed with user role" });
  } catch (error) {
    return next(error);
  }
});

cookiesRouter.get("/get-signed", (req, res, next) => {
  try {
    return res.json({ message: req.signedCookies });
  } catch (error) {
    return next(error);
  }
});

export default cookiesRouter;
