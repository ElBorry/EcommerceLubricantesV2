import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "express-compression";
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";

import indexRouter from "./src/routers/index.router.js";
import __dirname from "./utils.js";
import argsUtil from "./src/utils/args/args.util.js";
import variablesEnviroment from "./src/utils/env/env.util.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import winstonMid from "./src/middlewares/winston.mid.js";
import swaggerOptions from "./src/utils/swagger/swagger.util.js";

//HTTP Server
const server = express();
const port = variablesEnviroment.PORT || argsUtil.p;
const ready = () => {
  console.log("Server ready on port :" + port);
};
server.listen(port, ready);

const specs = swaggerJSDoc(swaggerOptions);

//MIDDLEWARES - EXPRESS
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(winstonMid);
server.use(cookieParser(variablesEnviroment.SECRET_COOKIE));
server.use(cors({ origin: true, credentials: true }));
server.use("/api/docs", serve, setup(specs));
server.use(
  compression({
    brotli: { enabled: true, zlib: {} },
  })
);

//ROUTER MAIN
server.use("/", indexRouter);
//MIDDLEWARES - OWN
server.use(errorHandler);
server.use(pathHandler);
