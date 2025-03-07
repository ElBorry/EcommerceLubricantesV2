import argsUtil from "../args/args.util.js";
import { createLogger, format, transports, addColors } from "winston";

const { colorize, simple } = format;
const environment = argsUtil.env;

const levels = { fatal: 0, error: 1, info: 2, http: 3 };
const colors = { fatal: "red", error: "yellow", info: "green", http: "cyan" };
addColors(colors);

const loggerConfig = {
  levels,
  format: environment === "dev" ? colorize() : simple(),
};

const transportsConfig = [
  new transports.Console({ level: "http", format: simple() }),
];

if (environment !== "dev") {
  transportsConfig.push(
    new transports.File({
      level: "error",
      format: simple(),
      filename: "./src/utils/errors/errors.log",
    })
  );
}

const winstonLog = createLogger({
  ...loggerConfig,
  transports: transportsConfig,
});

export default winstonLog;
