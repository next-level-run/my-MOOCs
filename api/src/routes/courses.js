"use strict";

const express = require("express");
const router = express.Router();

const Course = require("../models/course");
const Review = require("../models/review");
const auth = require("../middlewares/auth")

router.get("/", function (req, res, next) {
  Course.find()
    .select("_id, title")
    .exec(function (err, courses) {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ data: courses });
    });
});

router.get("/:id", function (req, res, next) {
  Course.findById(req.params.id)
    .populate({
      path: "user",
      model: "User",
    })
    .populate({
      path: "reviews",
      model: "Review",
      populate: {
        path: "user",
        model: "User",
      },
    })
    .exec(function (err, course) {
      if (err) {
        res.status(404).json({
          response: "Not found",
          error: err,
        });
      } else {
        res.status(200).json({ data: [course] });
      }
    });
});

router.post("/", auth, function(req, res, next) {
  const course = new Course(req.body);
  course.save(function (error) {
    if (error && error.name === "ValidationError") {
      res.status(400).json({
        res: error,
      });
    } else if (error) {
      return next(error);
    } else {
      res.status(201).send();
    }
  });
});

router.put("/:courseId", auth, function (req, res, next) {
  if (req.body.user && req.body.user._id) {
    const course = new Course(req.body);
    Course.update({ _id: course._id }, course, function (error) {
      if (error && error.name === "ValidationError") {
        res.status(400).json({
          response: error,
        });
      } else if (error) {
        return next(error);
      } else {
        res.status(204).send();
      }
    });
  } else {
    let err = new Error("Courses can only be edited by their authors");
    err.status = 401;
    return next(err);
  }
});

router.post("/:courseId/reviews", auth, function(req, res, next) {
  let review = new Review(req.body);
  review.save(function (error) {
    if (error && error.name === "ValidationError") {
      res.status(400).json({
        response: error,
      });
    } else if (error) {
      return next(error);
    } else {
      Course.findOne({ _id: req.params.courseId }, function (error, course) {
        if (error) return next(error);
        course.reviews.push(review._id);
        course.save(function (error, updated) {
          if (error) return next(error);
          res
            .status(201)
            .location("/courses/" + updated._id)
            .send();
        });
      });
    }
  });
});

module.exports = router;
