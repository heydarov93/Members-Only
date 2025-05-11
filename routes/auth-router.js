const { Router } = require("express");
const authController = require("../controllers/auth-controller");
const validateSignup = require("../middlewares/validate-signup");
const { isNotAuth, isAuth } = require("../middlewares/auth-middlewares");

const router = Router();

// Signup
router.get("/signup", isNotAuth, authController.showSignupForm);
router.post("/signup", validateSignup, authController.signup);

// Login
router.get("/login", isNotAuth, authController.showLoginForm);
router.post("/login", isNotAuth, authController.login);
router.post("/logout", isAuth, authController.logout);

module.exports = router;
