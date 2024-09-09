import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user-model.js";

const protect = asyncHandler(async (req, res, next) => {
  if (!req.cookies || !req.cookies.jwt) {
    res.status(401);
    throw new Error("No token, user is not authorized");
  }

  const token = req.cookies.jwt;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id).select("-password");
    next();
  } catch (err) {
    res.status(401);
    throw new Error("User not authorized");
  }
});

export { protect };
