import winston from 'winston';
import 'winston-daily-rotate-file';

const logLevels = {
    levels: {
        http: 0,
        info: 1,
        error: 2,
        fatal: 3
    },
    colors: {
        http: 'blue',
        info: 'green',
        error: 'red',
        fatal: 'magenta'
    }
};

winston.addColors(logLevels.colors);

const developmentLogger = winston.createLogger({
    levels: logLevels.levels,
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.Console({
            level: 'http'
        })
    ]
});

const productionLogger = winston.createLogger({
    levels: logLevels.levels,
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console({
            level: 'http'
        }),
        new winston.transports.DailyRotateFile({
            level: 'error',
            filename: 'logs/errors-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ]
});

const logger = process.env.NODE_ENV === 'production' ? productionLogger : developmentLogger;

export default logger;
