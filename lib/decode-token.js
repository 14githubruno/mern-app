import jwt from "jsonwebtoken";

const decodeToken = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded) return decoded;
  else throw new Error("Decoding failed");
};

export { decodeToken };
