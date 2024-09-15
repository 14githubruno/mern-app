import jwt from "jsonwebtoken";
import User from "../models/user-model.js";
import { throwError } from "../lib/throw-error.js";

/**
 * @typedef {Object} ExpressRequest
 * @typedef {Object} ExpressResponse
 * @typedef {Function} ExpressNextFunction
 *
 * @async
 * @function
 * Middleware to check if user is authenticated and thus protect private routes.
 *
 * @param {ExpressRequest} req - The Express request object.
 * @param {ExpressResponse} res - The Express response object.
 * @param {ExpressNextFunction} next - Function to call the next middleware.
 *
 * @throws Error if authentication fails or an unexpected error occurs.
 */
const protect = async (req, res, next) => {
  if (!req.cookies || !req.cookies.jwt) {
    throwError(res, 401, "No token, user is not authorized");
  }

  const token = req.cookies.jwt;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id).select("-password");
    next();
  } catch (err) {
    throwError(res, 401, "User is not authorized");
  }
};

export { protect };
