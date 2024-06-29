import {
  createService,
  readService,
  updateService,
  destroyService,
  readOneService,
  paginateService,
} from "../services/products.service.js";

const create = async (req, res, next) => {
  try {
    const data = req.body;
    const one = await createService(data);
    if (one) {
      return res.message201("Product ID: " + one.id);
    }
  } catch (error) {
    return next(error);
  }
}

const update = async(req, res, next) => {
  try {
    const { pid } = req.params;
    const data = req.body;
    const one = await updateService(pid, data);
    if (one) {
      return res.response200(one);
    } else {
      return res.error404();
    }
  } catch (error) {
    return next(error);
  }
}

const read = async(req, res, next) => {
  try {
    const { category } = req.query;
    let all;
    if (category) {
      all = await readService(category);
    } else {
      all = await readService();
    }
    if (all) {
      return res.response200(all);
    } else {
      return res.error404();
    }
  } catch (error) {
    return next(error);
  }
}

 const paginate = async (req, res, next) => {
  try {
    const filter = {};
    const opts = {};

    if (req.query.limit) {
      opts.limit = req.query.limit;
    }
    if (req.query.page) {
      opts.page = req.query.page;
    }
    if (req.query.user_id) {
      filter.user_id = req.query.user_id;
    }

    if (req.query.category) {
      filter.category = req.query.category;
    }

    const all = await paginateService({ filter, opts });

    const info = {
      totalPage: all.totalPages,
      limit: all.limit,
      prevPage: all.prevPage,
      nextPage: all.nextPage,
      page: all.page,
    };

    return res.paginate(all.docs, info);
  } catch (error) {
    return next(error);
  }
}

const readOne = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await readOneService(pid);
    if (one) {
      return res.response200(one);
    } else {
      return res.error404();
    }
  } catch (error) {
    return next(error);
  }
}

const destroy = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const one = await destroyService(pid);
    if (one) {
      return res.response200(one);
    } else {
      return res.error404();
    }
  } catch (error) {
    return next(error);
  }
}

export { create, update, read, paginate, readOne, destroy };
