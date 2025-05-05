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
router.get("/logout", (req, res) => res.send("User logged out"));

module.exports = router;
