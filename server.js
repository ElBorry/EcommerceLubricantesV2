import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import compression from "express-compression";
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
import ExpressHandlebars  from "express-handlebars"; // Importa el motor de plantillas de handlebars

import indexRouter from "./src/router/index.router.js";
import __dirname from "./utils.js";
import argsUtil from "./src/utils/args/args.util.js";
import variablesEnviroment from "./src/utils/env/env.util.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import winstonMid from "./src/middlewares/winston.mid.js";
import swaggerOptions from "./src/utils/swagger/swagger.util.js";

const hbs = ExpressHandlebars.create({
  helpers: {
    range: function (start, end) {
      let range = [];
      for (let i = start; i <= end; i++) {
        range.push(i);
      }
      return range;
    },
    ifEquals: function (arg1, arg2, options) {
      return arg1 == arg2 ? options.fn(this) : options.inverse(this);
    },
  },
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
});

// HTTP Server
const server = express();
const port = variablesEnviroment.PORT || argsUtil.p;
const ready = () => {
  console.log("Server ready on port :" + port);
};
server.listen(port, ready);

const specs = swaggerJSDoc(swaggerOptions);

// MIDDLEWARES - EXPRESS
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
server.engine("handlebars", hbs.engine);
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");
// ROUTER MAIN
server.use("/", indexRouter);

// MIDDLEWARES - OWN
server.use(errorHandler);
server.use(pathHandler);
