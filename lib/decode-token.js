// pkgs
import jwt from "jsonwebtoken";

// lib
import { throwError } from "./throw-error.js";

/**
 * @function
 * To decode JWT token.
 *
 * @param {Response} res - Express response object.
 * @param {string} token - The token string.
 * @param {string} secret - The secret string used to sign token.
 *
 * @returns {string} The decoded JWT.
 * @throws Error if decoding of token fails, using ExpressResponse.
 */
const decodeToken = (res, token, secret) => {
  const decoded = jwt.verify(token, secret);

  if (decoded) return decoded;
  else throwError(res, 500, "Something went wrong. Try again");
};

export { decodeToken };
