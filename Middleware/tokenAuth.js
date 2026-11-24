const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. Token is required." });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Access denied. Token is required." });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRETE);
    // tokens issued before the payload fix carry no userId
    if (!decoded.userId) {
      return res
        .status(401)
        .json({ error: "Session expired, please log in again." });
    }
    req.userId = String(decoded.userId);
    req.userRole = decoded.role;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token." });
  }
};

// Use after verifyToken: requireRole("teacher") or requireRole("teacher", "student")
exports.requireRole =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      return res
        .status(403)
        .json({ error: `Only ${roles.join(" or ")} accounts can do this.` });
    }
    next();
  };

// Use after verifyToken on routes like /user/:id: the id must be the caller's own
exports.requireSelf =
  (param = "id") =>
  (req, res, next) => {
    if (String(req.params[param] || "").trim() !== req.userId) {
      return res
        .status(403)
        .json({ error: "You can only access your own account." });
    }
    next();
  };
