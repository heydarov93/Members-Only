const CustomForbiddenError = require("../error/CustomForbiddenError");
const CustomUnauthorizedError = require("../error/CustomUnauthorizedError");

// Check if user logged in
const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/auth/login");
  }
};

// Check if the user is NOT authenticated
const isNotAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/");
  }
};

// Check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user.is_admin) return next();

  throw new CustomForbiddenError(
    "You don't have a permission for this action, only admins"
  );
};

// Check if user is the member of the private clubhouse
const isMember = (req, res, next) => {
  if (req.user.is_member) return next();

  throw new CustomForbiddenError(
    "You don't have a permission for this action, only members"
  );
};

module.exports = {
  isAuth,
  isNotAuth,
  isAdmin,
  isMember,
};
