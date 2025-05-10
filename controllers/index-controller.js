const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const { formatDate } = require("../utils/format-date");

// Display Home page
const showHomePage = asyncHandler(async (req, res) => {
  const posts = await db.getPosts();

  res.render("index", { posts, formatDate });
});

module.exports = {
  showHomePage,
};
