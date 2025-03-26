const { verifyToken } = require("../utils/jwd");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next()
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
const authorize = (role) => (req, res, next) => {
    if (req.user.role !== role) return res.status(403).json({ message: "Forbidden" });
    next();
};

module.exports = { authenticate,authorize };