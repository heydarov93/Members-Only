const { Router } = require("express");

const router = Router();

// Signup
router.get("/signup", (req, res) => res.send("Signup page"));
router.post("/signup", (req, res) => res.send("User created"));

// Login
router.get("/login", (req, res) => res.send("Login page"));
router.post("/login", (req, res) => res.send("User logged in"));
router.get("/logout", (req, res) => res.send("User logged out"));

module.exports = router;
