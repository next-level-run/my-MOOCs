"use strict";

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "This field is required"],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "This field is required"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "This field is required"],
    trim: true,
  },
});

UserSchema.pre("save", function (next) {
  let user = this;
  bcrypt.hash(user.password, 10, function (error, hash) {
    if (error) {
      return next(error);
    }
    user.password = hash;
    return next();
  });
});

UserSchema.path("email").validate(function (email) {
  return validator.isEmail(email);
}, "Invalid email address");

const User = mongoose.model("User", UserSchema);
module.exports = User;
