import jwt from "jsonwebtoken";
import { throwError } from "./throw-error.js";

const generateToken = (res, _id) => {
  const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });

  if (token) return token;
  else throwError(res, 500, "Something went wrong. Try again");
};

export { generateToken };
