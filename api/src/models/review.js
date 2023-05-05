"use strict";

const mongoose = require("mongoose");

const User = require("./user");

const ReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  postedOn: {
    type: Date,
    default: Date.now,
  },
  rating: {
    type: Number,
    required: [true, "A course needs to have a rating"],
    min: 1,
    max: 5,
  },
  review: {
    type: String,
  },
});

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;
