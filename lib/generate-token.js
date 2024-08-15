import jwt from "jsonwebtoken";

const generateToken = (_id, expirationTime) => {
  const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: expirationTime,
  });
  return token;
};

export { generateToken };
