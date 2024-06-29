import { config } from "dotenv";
import argsUtil from "./args.util.js";

const { env } = argsUtil;

//si env es dev debo usar env.dev
//si env es prod debo usar env.prod

const path = env === "prod" ? "./.env.prod" : "./.env.dev";
config({ path });

const enviroment = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  SECRET_KEY: process.env.SECRET_KEY,
  SECRET_COOKIE: process.env.SECRET_COOKIE,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
};

export default enviroment;