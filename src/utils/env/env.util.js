import { config } from "dotenv";
import argsUtil from "../args/args.util.js";

const environment = argsUtil.env;

const path =
  environment === "dev"
    ? "./.env.dev"
    : environment === "prod"
    ? "./.env.prod"
    : "./.env.test";

config({ path });

const variablesEnviroment = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  SECRET_COOKIE: process.env.SECRET_COOKIE,
  SECRET_SESSION: process.env.SECRET_SESSION,
  SECRET_JWT: process.env.SECRET_JWT,
  GOOGLE_EMAIL: process.env.GOOGLE_EMAIL,
  GOOGLE_PASSWORD: process.env.GOOGLE_PASSWORD,
};

export default variablesEnviroment;
