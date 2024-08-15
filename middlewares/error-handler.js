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
