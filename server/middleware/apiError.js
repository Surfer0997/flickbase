const httpStatus = require('http-status');
const mongoose = require('mongoose');

class ApiError extends Error {
  // extending express built-in Error class
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

// we want to use this as middleware
// so every time we do something like 'throw new Error' we actually made 'throw new ApiError'

const handleError = (err, res) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
};

const convertToApiError = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message);
    console.log(error);
  }
  next(error);
};

module.exports = { ApiError, handleError, convertToApiError };
