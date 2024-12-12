// pkgs
import jwt from "jsonwebtoken";

// lib
import { throwError } from "./throw-error.js";

/**
 * @function
 * To generate JWT token.
 *
 * @param {Response} res - Express response object.
 * @param {string} dbField - DB field (i.e. _id).
 * @param {string} exp - Token expiration date.
 *
 * @returns {string} The generated JWT token.
 * @throws Error if generation of token fails, using ExpressResponse.
 */
const generateToken = (res, dbField, exp) => {
  const token = jwt.sign({ dbField }, process.env.JWT_SECRET, {
    expiresIn: exp,
  });

  if (token) return token;
  else throwError(res, 500, "Something went wrong. Try again");
};

export { generateToken };
