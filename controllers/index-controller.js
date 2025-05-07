const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

// Display Home page
const showHomePage = asyncHandler(async (req, res) => {
  const posts = await db.getPosts();
  res.render("index", { posts });
});

module.exports = {
  showHomePage,
};
