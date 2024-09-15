import jwt from "jsonwebtoken";
import { throwError } from "./throw-error.js";

/**
 * @typedef {Object} ExpressResponse
 *
 * @function
 * To decode JWT token.
 *
 * @param {ExpressResponse} res - Express response object.
 * @param {string} token - the token string.
 *
 * @returns {string} The decoded JWT token.
 * @throws Error if decoding of token fails, using ExpressResponse.
 */
const decodeToken = (res, token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded) return decoded;
  else throwError(res, 500, "Something went wrong. Try again");
};

export { decodeToken };
