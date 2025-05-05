const asyncHandler = require("express-async-handler");

// Display Home page
const showHomePage = asyncHandler(async (req, res) => {
  res.render("index");
});

module.exports = {
  showHomePage,
};
