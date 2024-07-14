import { Router } from 'express';
import logger from '../utils/logger.js'; // Importa logger desde logger.js

class LoggerRouter {
    constructor() {
        this.router = Router();
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/api/loggers', (req, res) => {
            logger.http('Ejemplo de log HTTP');
            logger.info('Ejemplo de log INFO');
            logger.error('Ejemplo de log ERROR');
            logger.fatal('Ejemplo de log FATAL'); // Usando logger en lugar de productionLogger

            res.send('Logs registrados. Verifique la consola y el archivo errors.log (si corresponde).');
        });
    }

    getRouter() {
        return this.router;
    }
}

export default LoggerRouter;
