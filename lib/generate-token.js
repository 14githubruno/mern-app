// pkgs
import jwt from "jsonwebtoken";

// lib
import { throwError } from "./throw-error.js";

/**
 * @function
 * To generate JWT token.
 *
 * @param {Response} res - Express response object.
 * @param {string} _id - User ID.
 *
 * @returns {string} The generated JWT token.
 * @throws Error if generation of token fails, using ExpressResponse.
 */
const generateToken = (res, _id) => {
  const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  if (token) return token;
  else throwError(res, 500, "Something went wrong. Try again");
};

export { generateToken };
