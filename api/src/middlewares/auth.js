"use strict";

const auth = require("basic-auth");
const bcrypt = require("bcrypt");

const User = require("../models/user");

function authorize(req, res, next) {
  const unauthorized = new Error("Unauthorized");
  unauthorized.status = 401;

  const credentials = auth(req);

  if (credentials && credentials.name && credentials.pass) {
    User.findOne({ email: credentials.name }).exec(function (err, user) {
      if (err || !user) return next(unauthorized);
      bcrypt.compare(credentials.pass, user.password, function (err, check) {
        if (check) {
          req.userId = user._id;
          return next();
        }

        return next(unauthorized);
      });
    });
  } else {
    return next(unauthorized);
  }
}

module.exports = authorize;
