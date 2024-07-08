const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../errors");
require("dotenv").config();

const userAuthentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthorizedError("No valid token provided");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username, email } = decoded;
    req.user = { id, username, email, token };
    next();
  } catch (error) {
    throw new UnauthorizedError("Invalid token");
  }
};

module.exports = userAuthentication;
