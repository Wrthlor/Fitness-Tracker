const express = require('express');
const app = express();
require('express-async-errors');
const cors = require('cors');

const userRouter = require('./controllers/users');
const trackerRouter = require('./controllers/tracker');
const middleware = require('./utils/middleware');

// Middleware
app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/', userRouter);
app.use('/', trackerRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;