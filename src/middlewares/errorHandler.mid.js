import winstonLog from "../utils/winston/winston.util.js";

const errorHandler = (error, req, res, next) => {
  const message = `${req.method} - ${error.statusCode} - ${
    req.url
  } - ${new Date().toLocaleTimeString()} - ${error.message}`;

  winstonLog.error(message);

  return res.json({
    statusCode: error.statusCode || 500,
    message: error.message || "CODER API ERROR",
  });
};

export default errorHandler;
