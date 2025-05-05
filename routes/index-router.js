const { Router } = require("express");
const indexController = require("../controllers/index-controller");

const router = Router();

// Show home page
router.get("/", indexController.showHomePage);

module.exports = router;
