// pkgs
import jwt from "jsonwebtoken";

/**
 * @function
 * To decode JWT token.
 *
 * @param {string} token - The token string.
 * @param {string} secret - The secret string used to sign token.
 *
 * @returns {string} The decoded JWT.
 */
const decodeToken = (token, secret) => {
  const decoded = jwt.verify(token, secret);
  return decoded;
};

export { decodeToken };
