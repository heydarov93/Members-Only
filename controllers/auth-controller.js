const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const db = require("../db/queries");
const { genPassword } = require("../utils/password-utils");
const passport = require("passport");
require("../config/passport");

// Display signup form
const showSignupForm = asyncHandler(async (req, res) => {
  res.render("signup");
});

// Sign up the user
const signup = asyncHandler(async (req, res) => {
  const { first_name, last_name, email, password, confirm_password } = req.body;

  // Get validation errors, if any
  const errors = validationResult(req);

  // If there is an error, render signup page with user entered data and error messages
  if (!errors.isEmpty()) {
    return res.render("signup", {
      errors: errors.errors,
      formValues: { first_name, last_name, email, password, confirm_password },
    });
  }

  // If inputs are valid, generate hash password from user's password
  const hashPassword = await genPassword(password);

  const newUserId = await db.createUser({
    first_name,
    last_name,
    email,
    hashPassword,
  });

  // If creation of a new user failed, redirect user to sign-up page and set sign-up status to fail
  if (!newUserId) {
    res.redirect("/auth/signup?signupStatus=fail");
    return;
  }

  // If registration is successfull, redirect user to login page and set sign-up status to success
  res.redirect("/auth/login?signupStatus=success");
});

// Display login form
const showLoginForm = asyncHandler(async (req, res) => {
  res.render("login");
});

// Login post controller
const login = passport.authenticate("local", {
  failureRedirect: "/auth/login",
  successRedirect: "/",
});

module.exports = {
  showSignupForm,
  signup,
  showLoginForm,
  login,
};
