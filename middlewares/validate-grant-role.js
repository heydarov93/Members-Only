const { body } = require("express-validator");
require("dotenv").config();

const validateGrantAdmin = [
  body("admin_key")
    .trim()
    .matches(process.env.ADMIN_KEY)
    .withMessage("Invalid admin key"),
];

const validateGrantMember = [
  body("member_key")
    .trim()
    .matches(process.env.MEMBER_KEY)
    .withMessage("Invalid member key"),
];

module.exports = {
  validateGrantAdmin,
  validateGrantMember,
};
