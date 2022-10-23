const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.headers.authorization.split(" ")[1];

  // Check if there's no token
  if (token === null) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verfiy token
  try {
    const decoded = jwt.verify(token, "ivet");

    req.user = decoded.id;

    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
