const queries = require('../db/queries');
const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

function isValidId(req, res, next) {
  if (!isNaN(req.params.id)) {
    return next();
  }
  next(new Error("Invalid ID"));
}

function validUser(user) {
  const hasEmail = typeof user.email == "string";
  const hasPass = typeof user.password == "string";
  return hasEmail && hasPass;
}

router.get('/users', (req,res,next) => {
  queries.getAll('user').then(users => {
    res.json(users)
  });
});
router.get('/beers', (req,res,next) => {
  queries.getAll('beer').then(beers => {
    res.json(beers);
  })
})

router.post("/signup", function(req, res, next) {
  if (validUser(req.body)) {
    queries.getUserByEmail(req.body.email).then((user) => {
      if (!user) {
        bcrypt.genSalt(8, function(err, salt) {
          bcrypt.hash(req.body.password, salt, function(err, hash) {
            const user = {
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              email: req.body.email,
              password: hash,
              campus: req.body.campus,
              is_admin: req.body.is_admin
            };
            queries.create("user", user).then((user) => {
              jwt.sign({
                id: user[0].id
              }, process.env.TOKEN_SECRET, {
                expiresIn: "1h"
              }, (err, token) => {
                console.log("err", err);
                console.log("token", token);
                res.json({
                  id: user[0].id,
                  token,
                  message: "ok"
                });
              });
            });
          });
        });
      } else {
        next(new Error("Email already in use"));
      }
    });
  } else {
    next(new Error("Invalid User"));
  }
});
module.exports = router;
