const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, "exer1");
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error)
    res.status(400).send("Invalid token.");
  }
}

module.exports = auth;
