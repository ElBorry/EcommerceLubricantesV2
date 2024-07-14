import dotenv from 'dotenv';
dotenv.config();

import enviroment from "./src/utils/env.util.js";
import express from "express";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import morgan from "morgan";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import { createServer } from "http";
import { Server } from "socket.io";
import socketCb from "./src/router/index.socket.js";
import cookieParser from "cookie-parser";
import argsUtil from "./src/utils/args.util.js";
import IndexRouter from "./src/router/index.router.js";
import cors from "cors";
import mongoose from 'mongoose';
import passport from "./src/middlewares/passport.mid.js";
import logger from './src/utils/logger.js';

const server = express();
const port = enviroment.PORT || argsUtil.p;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(enviroment.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info('Connected to MongoDB');
  } catch (err) {
    logger.error('Error connecting to MongoDB:', err);
  }
};

connectToDatabase();

const ready = async () => {
  logger.info("Server ready on port " + port);
};

const nodeServer = createServer(server);
nodeServer.listen(port, ready);

const socketServer = new Server(nodeServer);
socketServer.on("connection", socketCb);

server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");
server.use(cookieParser(enviroment.SECRET_KEY));

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(express.static(__dirname + "/public"));
server.use(cors({ origin: true, credentials: true }));

server.use(passport.initialize());

const router = new IndexRouter();
server.use("/", router.getRouter());
server.use(errorHandler);
server.use(pathHandler);

logger.info(argsUtil);
logger.info(enviroment);
