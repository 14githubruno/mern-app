// pkgs
import bcrypt from "bcrypt";

// lib
import { throwError } from "./throw-error.js";

/**
 * @async
 * @function
 * To compare passwords.
 *
 * @param {Response} res - Express response object.
 * @param {string} reqBodyPassword - Password sent from the client.
 * @param {string} DBpassword - Password stored in db.
 *
 * @returns {Promise<boolean>} Resolves with true if passwords match.
 * @throws Error if comparing fails, using ExpressResponse.
 */
const comparePassword = async (res, reqBodyPassword, DBPassword) => {
  try {
    const match = await bcrypt.compare(reqBodyPassword, DBPassword);
    return match;
  } catch (error) {
    throwError(res, 500, "Something went wrong. Try again");
  }
};

export { comparePassword };
