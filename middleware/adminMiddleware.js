const { protect } = require("./authMiddleware");

const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401).json({ msg: "Not authorized as an admin" });
  }
};

module.exports = { admin };
