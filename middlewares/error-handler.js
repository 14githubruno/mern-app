/**
 * @async
 * @function
 * Middleware to handle app errors.
 *
 * @param {Error} err - Error caught
 * @param {Request} req - Express request.
 * @param {Response} res - Express response.
 * @param {NextFunction} next - Function to call the next middleware.
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
