import jwt from "jsonwebtoken";

const createToken = (data) => {
  const opts = { expiresIn: 60 * 60 * 24 };
  const token = jwt.sign(data, process.env.JWT_SECRET, opts);
  return token;
};

const verifyToken = (token) => {
  const data = jwt.verify(token, process.env.JWT_SECRET);
  return data;
};

export { createToken, verifyToken };