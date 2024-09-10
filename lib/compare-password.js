import bcrypt from "bcrypt";
import { throwError } from "./throw-error.js";

const comparePassword = async (res, reqBodyPassword, DBPassword) => {
  try {
    const match = await bcrypt.compare(reqBodyPassword, DBPassword);
    return match;
  } catch (error) {
    return throwError(res, "Something went wrong. Try again");
  }
};

export { comparePassword };
