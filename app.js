const express = require('express');
const app = express();
const cors = require('cors');

const trackerRouter = require('./controllers/tracker');
const middleware = require('./utils/middleware');
const logger = require('./utils/loggers');

// Middleware
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/', trackerRouter);
app.use(middleware.unknownEndpoint);

module.exports = app;