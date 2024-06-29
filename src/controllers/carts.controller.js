import {
  createService,
  readService,
  updateService,
  destroyService,
  readOneService,
  destroyAllService,
} from "../services/carts.service.js";

async function create(req, res, next) {
  try {
    const data = req.body;
    const one = await createService(data);
    if (one) {
      return res.message201("Cart ID: " + one.id + " created successfully");
    }
  } catch (error) {
    return next(error);
  }
}

async function read(req, res, next) {
  try {
    const { user_id } = req.query;
    if (user_id) {
      const all = await readService({ user_id });
      if (all.length > 0) {
        return res.response200(all);
      } else {
        return res.error404();
      }
    }
  } catch (error) {
    return next(error);
  }
}

async function readOne(req, res, next) {
  try {
    const { cid } = req.params;
    const one = await readOneService(cid);
    if (one) {
      return res.response200(one);
    } else {
      return res.error404();
    }
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  try {
    const { cid } = req.params;
    const data = req.body;
    const one = await updateService(cid, data);
    if (one) {
      return res.response200(one);
    } else {
      return res.error404();
    }
  } catch (error) {
    return next(error);
  }
}

async function destroyAll(req, res, next) {
  try {
    const { _id } = req.user;
    const all = await destroyAllService(_id);
    if (all) {
      return res.response200(all);
    } else {
      return res.error404();
    }
  } catch (error) {
    return next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { cid } = req.params;
    const one = await destroyService(cid);
    if (one) {
      return res.response200(one);
    } else {
      return res.error404();
    }
  } catch (error) {
    return next(error);
  }
}

export { create, read, readOne, update, destroyAll, destroy };
