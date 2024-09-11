import bcrypt from "bcrypt";
import { throwError } from "./throw-error.js";

const hashPassword = async (res, password) => {
  try {
    const hashed = await bcrypt.hash(password, Number(process.env.SALT));
    return hashed;
  } catch (error) {
    throwError(res, 500, "Something went wrong. Try again");
  }
};

export { hashPassword };
