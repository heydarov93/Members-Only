const { Router } = require("express");
const usersController = require("../controllers/users-controller");
const { isAuth } = require("../middlewares/auth-middlewares");
const {
  validateGrantAdmin,
  validateGrantMember,
} = require("../middlewares/validate-grant-role");

const router = Router();

// Show user profile (requires login)
router.get("/profile", isAuth, usersController.showProfile);

// Become an admin (require login)
router.post(
  "/grant-admin",
  isAuth,
  validateGrantAdmin,
  usersController.grantAdminRole
);

// Become a member (require login)
router.post(
  "/grant-membership",
  isAuth,
  validateGrantMember,
  usersController.grantMemberRole
);

module.exports = router;
