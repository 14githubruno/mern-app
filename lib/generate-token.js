// pkgs
import jwt from "jsonwebtoken";

/**
 * @function
 * To generate JWT token.
 *
 * @param {string} key - Key/value pair to sign token.
 * @param {string} secret - Secret string to sign token.
 * @param {string} expiresIn - Token expiration date.
 *
 * @returns {string} The generated JWT.
 */
const generateToken = (key, secret, expiresIn) => {
  const token = jwt.sign({ key }, secret, { expiresIn });
  return token;
};

export { generateToken };
