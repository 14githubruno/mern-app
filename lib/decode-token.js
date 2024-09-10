import jwt from "jsonwebtoken";
import { throwError } from "./throw-error.js";

const decodeToken = (res, token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded) return decoded;
  else return throwError(res, "Something went wrong. Try again");
};

export { decodeToken };
