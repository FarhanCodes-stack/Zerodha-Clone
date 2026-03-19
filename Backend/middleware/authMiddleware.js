const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "zerodha_secret_key";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized — token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { userId: decoded.userId };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized — invalid token" });
  }
};

module.exports = { authMiddleware };
