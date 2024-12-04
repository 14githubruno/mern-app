// pkgs
import bcrypt from "bcrypt";

// lib
import { throwError } from "./throw-error.js";

/**
 * @async
 * @function
 * To hash password.
 *
 * @param {Response} res - Express response object.
 * @param {string} password - Password to hash.
 *
 * @returns {Promise<string>} Resolves with hashed password.
 * @throws Error if hashing fails, using ExpressResponse.
 */
const hashPassword = async (res, password) => {
  try {
    const hashed = await bcrypt.hash(password, Number(process.env.SALT));
    return hashed;
  } catch (error) {
    throwError(res, 500, "Something went wrong. Try again");
  }
};

export { hashPassword };
