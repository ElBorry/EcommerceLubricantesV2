import {
  createService,
  updateService,
  readService,
  destroyService,
  readOneService,
} from "../services/users.service.js";

class UsersController {
  async create(req, res, next) {
    try {
      const data = req.body;
      const one = await createService(data);
      if (one) {
        res.message201("User ID: " + one._id);
      }
    } catch (error) {
      return next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { uid } = req.params;
      const data = req.body;
      const one = updateService(uid, data);
      if (one) {
        res.response200(one);
      } else {
        res.error404();
      }
    } catch (error) {
      return next(error);
    }
  }

  async read(req, res, next) {
    try {
      const { role } = req.query;
      const all = await readService(role);
      if (all.length > 0) {
        res.response200(all);
      } else {
        res.error404();
      }
    } catch (error) {
      return next(error);
    }
  }

  async readOne(req, res, next) {
    try {
      const { uid } = req.params;
      const one = await readOneService(uid);
      if (one) {
        res.response200(one);
      } else {
        res.error404();
      }
    } catch (error) {
      return next(error);
    }
  }

  async destroy(req, res, next) {
    try {
      const { uid } = req.params;
      const one = await destroyService(uid);
      if (one) {
        res.response200(one);
      } else {
        res.error404();
      }
    } catch (error) {
      return next(error);
    }
  }
}

const usersController = new UsersController();
const { create, update, read, readOne, destroy } = usersController;
export { create, update, read, readOne, destroy };