const logger = require('./loggers');

// Command line logger
const requestLogger = (req, res, next) => {
    logger.info('Method: ', req.method);
    logger.info('Path:   ', req.path);
    logger.info('Body:   ', req.body);
    logger.info('---');
    next();
}

// Sends status code 404 when unkonwn URL endpoint
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'Unknown endpoint' });
}

// Handles any errors
const errorHandler = (error, req, res, next) => {
    logger.error(error.message);

    next(error);
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}