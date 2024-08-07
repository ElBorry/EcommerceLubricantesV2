import { Router } from "express";
import { verifyToken } from "../utils/token/token.util.js";
import usersRepository from "../repositories/users.rep.js";
import winstonLog from "../utils/winston/winston.util.js";

class CustomRouter {
  //Build and configure each router instance
  constructor() {
    this.router = Router();
    this.init();
  }
  //Get all router routes
  getRouter() {
    return this.router;
  }
  //Initialize inherited property classes (sub-routers)
  init() {}
  //Handle middleware and final callbacks
  applyCbs(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      //Params 0 request || Param 1 response || Param 2 next
      try {
        await callback.apply(this, params);
      } catch (error) {
        return params[2](error);
      }
    });
  }
  responses = (req, res, next) => {
    res.response200 = (response) => {
      res.json({ statusCode: 200, response });
    };
    res.message200 = (message) => {
      res.json({ statusCode: 200, message });
    };
    res.response201 = (response) => {
      res.json({ statusCode: 201, response });
    };
    res.message201 = (message) => {
      res.json({ statusCode: 201, message });
    };
    res.paginate = (response, info) => {
      res.json({ statusCode: 200, response, info });
    };
    res.error400 = (message) => res.json({ statusCode: 400, message });
    res.error401 = () =>
      res.json({ statusCode: 401, message: "Bad auth from policies!" });
    res.error403 = () =>
      res.json({ statusCode: 403, message: "Forbidden from policies!" });
    res.error404 = (message) => res.json({ statusCode: 404, message });

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
            const user = await usersRepository.readByEmailRepository(email);
            // Protect user password!!
            delete user.password;
            req.user = user;
            return next();
          } else return res.error403();
        } catch (error) {
          return res.error400(error.message);
        }
      }
    }
  };

  create(path, arrayOfPolicies, ...callbacks) {
    this.router.post(
      path,
      this.responses,
      this.policies(arrayOfPolicies),
      this.applyCbs(callbacks)
    );
  }
  read(path, arrayOfPolicies, ...callbacks) {
    this.router.get(
      path,
      this.responses,
      this.policies(arrayOfPolicies),
      this.applyCbs(callbacks)
    );
  }
  update(path, arrayOfPolicies, ...callbacks) {
    this.router.put(
      path,
      this.responses,
      this.policies(arrayOfPolicies),
      this.applyCbs(callbacks)
    );
  }
  destroy(path, arrayOfPolicies, ...callbacks) {
    this.router.delete(
      path,
      this.responses,
      this.policies(arrayOfPolicies),
      this.applyCbs(callbacks)
    );
  }
  use(path, ...callbacks) {
    this.router.use(path, this.responses, this.applyCbs(callbacks));
  }
}

export default CustomRouter;
