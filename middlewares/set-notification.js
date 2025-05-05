// Notification keys should be excatly same with query keys, e.g. res.redirect("/auth/signup?signupStatus=success")
const notificationMessages = {
  signupStatus: {
    fail: "Something went wrong during sign up. Please try again.",
    success: "Sign up successful! You can now log in.",
  },
};

function setNotification(req, res, next) {
  for (const key in notificationMessages) {
    const value = req.query[key];
    if (value && notificationMessages[key][value]) {
      res.locals.notification = notificationMessages[key][value];

      // value = success/fail
      res.locals.status = value;
    }
  }
  next();
}

module.exports = setNotification;
