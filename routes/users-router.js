const { Router } = require("express");

const router = Router();

// Show user profile (requires login)
router.get("/profile", (req, res) => res.send("user profile"));

// Become a member or an admin (require login)
router.post("/upgrade-membership", (req, res) =>
  res.send("user became  a member/admin")
);

module.exports = router;
