const express = require('express');
const app = express();
const helmet = require('helmet');
const compression = require('compression');
const routes = require('./routes/v1');
const { errorFormatter, errorHandler, unknownRouteHandler } =
  require('./middlewares/error-middleware');

// set security HTTP headers
app.use(helmet());

// parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// api v1 routes
app.use('/api/v1', routes);

// To handle unknown route
app.use(unknownRouteHandler);

// Format error if needed
app.use(errorFormatter);

// handle error
app.use(errorHandler);

module.exports = app;