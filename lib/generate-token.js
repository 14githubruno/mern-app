import jwt from "jsonwebtoken";
import { throwError } from "./throw-error.js";

const generateToken = (res, _id, expirationTime) => {
  const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: expirationTime,
  });

  if (token) return token;
  else return throwError(res, "Something went wrong. Try again");
};

export { generateToken };
