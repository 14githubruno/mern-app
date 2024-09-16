/**
 * @function
 * Throws error with status code and error message.
 *
 * (The thrown error will be handled by errorHandler middleware)
 *
 * @param {Response} res - Express response object.
 * @param {number} status - HTTP status code.
 * @param {string} errorMsg - error message.
 *
 * @throws Error with specified status code and error message.
 */
const throwError = (res, status, errorMsg) => {
  res.status(status);
  throw new Error(errorMsg);
};

export { throwError };
