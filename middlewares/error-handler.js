/**
 * @typedef {Error} ExpressError
 * @typedef {Object} ExpressRequest
 * @typedef {Object} ExpressResponse
 * @typedef {Function} ExpressNextFunction
 *
 * @async
 * @function
 * Middleware to handle app errors.
 *
 * @param {ExpressError} err - Error caught
 * @param {ExpressRequest} req - Express request.
 * @param {ExpressResponse} res - Express response.
 * @param {ExpressNextFunction} next - Function to call the next middleware.
 *
 * @throws Returns error thrown by throwError function. See {@link throwError} lib fn for more details.
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode ? res.statusCode : 500;
  let message = err.message;
  let type = message.includes("token") ? "token" : "some other error";

  // handle mongoose error
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  res.status(statusCode).json({
    message,
    error: process.env.NODE_ENV === "production" ? null : err.stack,
    type,
  });
  next();
};

export { errorHandler };
