// import {Router} from 'express';
// import apiRouter from './api/index.api.js'
// import viewsRouter from './views/index.view.js'

// const indexRouter = Router();

// indexRouter.use('/api', apiRouter);
// indexRouter.use('/', viewsRouter);

// export default indexRouter;

import CustomRouter from "./CustomRouter.js";
import ApiRouter from "./api/index.api.js";
import ViewsRouter from "./views/index.view.js";

const api = new ApiRouter();
const apiRouter = api.getRouter();
const views = new ViewsRouter();
const viewsRouter = views.getRouter();
export default class IndexRouter extends CustomRouter {
  init() {
    this.router.use("/api", apiRouter);
    this.router.use("/", viewsRouter);
  }
}

// const indexRouter = new IndexRouter();

// export default indexRouter.getRouter();
