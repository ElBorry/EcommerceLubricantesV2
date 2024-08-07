import winstonLog from "../utils/winston/winston.util.js";

const logsMessages = async (req, res, next) => {
  winstonLog.fatal("Fatal Log");
  winstonLog.error("Error Log");
  winstonLog.info("Info Log");
  winstonLog.http("Http Log");
  try {
    return res.error400("Messages Winston");
  } catch (error) {
    return next(error);
  }
};

export default logsMessages;
