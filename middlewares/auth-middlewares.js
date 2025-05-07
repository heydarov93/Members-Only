const CustomUnauthorizedError = require("../error/CustomUnauthorizedError");

const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    throw new CustomUnauthorizedError(
      "You are not authorized to view this resource"
    );
  }
};

module.exports = {
  isAuth,
};
