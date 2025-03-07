import winstonLog from "../utils/winston/winston.util.js";

// Middleware for logging HTTP requests in winston
const winstonMid = (req, res, next) => {
  req.logger = winstonLog;
  req.logger.http(
    `${req.method} - ${req.url} - ${new Date().toLocaleTimeString()}`
  );
  return next();
};

export default winstonMid;
