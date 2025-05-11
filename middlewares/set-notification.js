// Notification keys should be excatly same with query keys, e.g. res.redirect("/auth/signup?signupStatus=success")
const notificationMessages = {
  signupStatus: {
    fail: "Something went wrong during sign up. Please try again.",
    success: "Sign up successful! You can now log in.",
  },
  createPost: {
    fail: "Something went wrong while submitting the post. Please try again.",
    success: "The post was created successfully.",
  },
  updatePost: {
    fail: "Something went wrong while updating the post. Please try again.",
    success: "The post was updated successfully.",
  },
  deletePost: {
    fail: "Something went wrong while deleting the post. Please try again.",
    success: "The post was deleted successfully.",
  },
  grantRole: {
    fail: "Something went wrong while granting the role. Please try again.",
    success: "The role was granted successfully.",
  },
};

function setNotification(req, res, next) {
  for (const key in notificationMessages) {
    const status = req.query[key];
    if (status && notificationMessages[key][status]) {
      res.locals.notification = notificationMessages[key][status];

      res.locals.status = status; // success or fail
      console.log(`${key}: ${res.locals.notification}`);
      break;
    }
  }
  next();
}

module.exports = setNotification;
