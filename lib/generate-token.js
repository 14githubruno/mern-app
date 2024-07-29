import jwt from "jsonwebtoken";

const generateToken = (_id) => {
  const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
  return token;
};

export { generateToken };
