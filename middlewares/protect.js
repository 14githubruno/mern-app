import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user-model.js";
import { throwError } from "../lib/throw-error.js";

const protect = asyncHandler(async (req, res, next) => {
  if (!req.cookies || !req.cookies.jwt) {
    return throwError(res, 401, "No token, user is not authorized");
  }

  const token = req.cookies.jwt;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id).select("-password");
    next();
  } catch (err) {
    return throwError(res, 401, "User is not authorized");
  }
});

export { protect };
