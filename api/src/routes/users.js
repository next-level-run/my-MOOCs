"use strict";

const express = require("express");
const idx = require("idx");

const router = express.Router();

const UserModel = require("../models/user");
const auth = require("../middlewares/auth");

router.get("/", auth, function (req, res, next) {
  UserModel.findOne({ _id: req.userId })
    .select("-hashedPassword")
    .exec(function (err, user) {
      if (err) return next(err);
      res.status(200).json({ data: [user] });
    });
});

router.post("/", function (req, res, next) {
  const username = idx(req, (_) => _.body.fullName);
  const email = idx(req, (_) => _.body.emailAddress);
  const password = idx(req, (_) => _.body.password);

  if (username && email && password) {
    UserModel.create(
      {
        username,
        email,
        password,
      },
      function (error, user) {
        if (error) {
          console.log("Oh no", error);
          return next(error);
        } else {
          return res.status(201).send();
        }
      }
    );
  } else {
    res.status(403).json({
      error: "All fields are required",
    });
  }
});

module.exports = router;
