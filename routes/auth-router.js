const { Router } = require("express");
const authController = require("../controllers/auth-controller");
const validateSignup = require("../middlewares/validate-signup");

const router = Router();

// Signup
router.get("/signup", authController.showSignupForm);
router.post("/signup", validateSignup, authController.signup);

// Login
router.get("/login", authController.showLoginForm);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

module.exports = router;
