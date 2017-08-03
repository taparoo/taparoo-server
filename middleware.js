const jwt = require("jsonwebtoken");
require("dotenv").config();

function checkTokenSetUser(req, res, next) {
  console.log(req.params);
  const tokenHeader = req.get("Authorization");
  if (tokenHeader) {
    const token = tokenHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        next();
      } else {
        req.user = decoded;
        console.log("req.user", req.user);
        next();
      }
    });
  } else {
    next();
  }
}

function ensureLoggedIn(req, res, next) {
  console.log(req.params);
  if (req.user) {
    console.log("here");
    next();
  } else {
    res.status(401);
    next(new Error("Un-Authorized"));
  }
}

module.exports = {
  ensureLoggedIn,
  checkTokenSetUser
};
