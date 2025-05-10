const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const db = require("../db/queries");

/* ======================== */
// Show current user profile
const showProfile = (req, res) => {
  res.render("user-profile");
};

/* ======================== */
// Grant admin role
const grantAdminRole = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("user-profile", { errors: errors.errors });
  }

  // Grant role
  const adminId = await db.grantRole(req.user.id, "admin");

  // If grant operation is failed redirect ser to the same page with fail notification message
  if (!adminId) {
    return res.redirect("/users/profile?grantRole=fail");
  }

  // If grant operation is successfull redirect user to the same page with success message
  res.redirect("/users/profile?grantRole=success");
});

/* ======================== */
// Grant member role
const grantMemberRole = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("user-profile", { errors: errors.errors });
  }

  // Grant role
  const memberId = await db.grantRole(req.user.id, "member");

  // If grant operation is failed redirect ser to the same page with fail notification message
  if (!memberId) {
    return res.redirect("/users/profile?grantRole=fail");
  }

  // If grant operation is successfull redirect user to the same page with success message
  res.redirect("/users/profile?grantRole=success");
});

module.exports = {
  showProfile,
  grantAdminRole,
  grantMemberRole,
};
