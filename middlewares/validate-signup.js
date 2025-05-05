const { body } = require("express-validator");
const db = require("../db/queries");

module.exports = [
  body("first_name")
    .trim()
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters")
    .isAlpha("en-US", { ignore: " '-" })
    .withMessage(
      "First name can only contain letters, spaces, apostrophes, or hyphens"
    ),
  body("last_name")
    .trim()
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters")
    .isAlpha("en-US", { ignore: " '-" })
    .withMessage(
      "Last name can only contain letters, spaces, apostrophes, or hyphens"
    ),
  body("email")
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (email) => {
      const user = await db.getUserByEmail(email);

      if (user) throw new Error("Email already exists");

      return true;
    }),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
    .matches(/^(?=.*[A-Z])(?=.*\d)[^\s]+$/)
    .withMessage(
      "Password must contain at least one uppercase letter, one number, and no spaces"
    ),
  body("confirm_password").custom((confirm_password, { req }) => {
    if (confirm_password !== req.body.password)
      throw new Error("Password confirmation does not match password");

    return true;
  }),
];
