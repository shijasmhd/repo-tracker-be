const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const nodeEnv = process.env.NODE_ENV;

const errorFormatter = (err, req, res, next) => {
  if (!(err instanceof ApiError)) {
    const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = err.message || httpStatus[statusCode];
    next(new ApiError(statusCode, message, false, err.stack));
  } else {
    next(err);
  }
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  if (nodeEnv === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  const response = {
    statusCode,
    message,
    ...(nodeEnv === 'development' && { stack: err.stack }),
  };

  if (nodeEnv === 'development') {
    console.log(err);
  }

  res.status(statusCode).send(response);
};

const unknownRouteHandler = (req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
}

module.exports = {
  errorFormatter,
  errorHandler,
  unknownRouteHandler,
};