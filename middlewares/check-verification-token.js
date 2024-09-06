import asyncHandler from "express-async-handler";
import Symbol from "../models/symbol-model.js";

const checkVerificationToken = asyncHandler(async (req, res, next) => {
  const thereIsToken = await Symbol.findOne({ token: req.params.token });

  if (!thereIsToken) {
    res.status(404);
    throw new Error("Token not found, invalid or expired");
  } else {
    next();
  }
});

export { checkVerificationToken };
