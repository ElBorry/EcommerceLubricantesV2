import { Router } from "express";
import { verifyToken } from "../utils/token.util.js";
import userManager from "../data/mongo/managers/UsersManager.mongo.js";

export default class CustomRouter {
  constructor() {
    this.router = Router();
    this.init();
  }
  getRouter() {
    return this.router;
  }
  init() { }
  applyCbs(cbs) {
    return cbs.map((each) => async (...params) => {
      try {
        await each.apply(this, params);
      } catch (error) {
        return params[2](error);
      }
    });
  }

  responses = (req, res, next) => {
    res.message200 = (message) => res.json({ statusCode: 200, message });
    res.response200 = (response) => res.json({ statusCode: 200, response });
    res.paginate = (response, info) =>
      res.json({ statusCode: 200, response, info });
    res.message201 = (message) => res.json({ statusCode: 201, message });
    res.error400 = (message) => res.json({ statusCode: 400, message });
    res.error401 = () =>
      res.json({ statusCode: 401, message: "Bad auth from policies!" });
    res.error403 = () =>
      res.json({ statusCode: 403, message: "Forbidden from policies!" });
    res.error404 = () =>
      res.json({ statusCode: 404, message: "Not found docs" });
    return next();
  };

  policies = (policies) => async (req, res, next) => {
    if (policies.includes("PUBLIC")) return next();
    else {
      let token = req.cookies["token"];
      if (!token) return res.error401();
      else {
        try {
          token = verifyToken(token);
          const { role, email } = token;
          if (
            (policies.includes("USER") && role === 0) ||
            (policies.includes("ADMIN") && role === 1)
          ) {
            const user = await userManager.readByEmail(email);
            req.user = user;
            return next();
          } else return res.error403();
        } catch (error) {
          return res.error400(error.message);
        }
      }
    }
  };

  create(path, arrayOfPolicies, ...cbs) {
    this.router.post(
      path,
      this.responses,
      this.policies(arrayOfPolicies),
      this.applyCbs(cbs)
    );
  }
  read(path, arrayOfPolicies, ...cbs) {
    this.router.get(
      path,
      this.responses,
      this.policies(arrayOfPolicies),
      this.applyCbs(cbs)
    );
  }
  update(path, arrayOfPolicies, ...cbs) {
    this.router.put(
      path,
      this.responses,
      this.policies(arrayOfPolicies),
      this.applyCbs(cbs)
    );
  }
  destroy(path, arrayOfPolicies, ...cbs) {
    this.router.delete(
      path,
      this.responses,
      this.policies(arrayOfPolicies),
      this.applyCbs(cbs)
    );
  }
  use(path, ...cbs) {
    this.router.use(path, this.responses, this.applyCbs(cbs));
  }
}
