// pkgs
import jwt from "jsonwebtoken";

// db models
import User from "../models/user-model.js";

// lib
import { throwError } from "../lib/throw-error.js";

/**
 * @async
 * @function
 * Middleware to check if user is authenticated and thus protect private routes.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - Function to call the next middleware.
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
