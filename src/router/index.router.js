import CustomRouter from "./CustomRouter.js";
import ApiRouter from "./api/index.api.js";
import ViewsRouter from "./views/index.view.js";
import LoggerRouter from './logger.router.js'; // Importa el LoggerRouter

const api = new ApiRouter();
const apiRouter = api.getRouter();
const views = new ViewsRouter();
const viewsRouter = views.getRouter();
const loggerRouter = new LoggerRouter().getRouter(); // Crea una instancia de LoggerRouter

export default class IndexRouter extends CustomRouter {
    init() {
        this.router.use("/api", apiRouter);
        this.router.use("/", viewsRouter);
        this.router.use(loggerRouter); // Añade el loggerRouter
    }
}
