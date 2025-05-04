const { Router } = require("express");

const router = Router();

// Show home page
router.get("/", (req, res) => res.send("Home page"));

module.exports = router;
