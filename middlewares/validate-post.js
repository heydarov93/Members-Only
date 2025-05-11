const { body, param } = require("express-validator");
const db = require("../db/queries");

const validatePostSubmission = [
  body("title")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Title must be at least 10 characters"),
  body("title")
    .isLength({ max: 255 })
    .withMessage("Title must be at most 255 characters"),
  body("content")
    .trim()
    .isLength({ min: 20 })
    .withMessage("Content must be at least 20 characters"),
];

const validatePostParams = [
  param("id").trim().isInt({ min: 1 }).withMessage("Post not found!"),
];

module.exports = {
  validatePostSubmission,
  validatePostParams,
};
