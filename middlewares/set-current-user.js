module.exports.setCurrentUser = (req, res, next) => {
  // Sets current logged user for views
  res.locals.currentUser = req.user;
  next();
};
