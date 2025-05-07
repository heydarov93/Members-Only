const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const { validationResult } = require("express-validator");

// Display all posts
const showAllPosts = (req, res) => {
  // Home page controller fetches all posts
  res.redirect("/");
};

// Display add post form
const showCreatePostForm = (req, res) => {
  // If the post submission process fails, form values are stored in the session
  // This prevents the user from losing their input — a better user experience
  if (req.session.formValues) {
    res.locals.formValues = req.session.formValues;
    delete req.session.formValues;
  }

  res.render("posts-form");
};

// Add new post
const createPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  // Get validation errors, if any
  const errors = validationResult(req);

  // If there is an error, render create post form page with user entered data and error messages
  if (!errors.isEmpty()) {
    return res.render("posts-form", {
      errors: errors.errors,
      formValues: { title, content },
    });
  }

  const newPostId = await db.createPost({
    title,
    content,
    user_id: req.user.id,
  });

  // If creation of a new post failed, redirect user to create post page and set create post status to fail
  if (!newPostId) {
    req.session.formValues = { title, content };
    return res.redirect("/posts/create?createPost=fail");
  }

  // If post created successfully, redirect user to home page and set create post status to success
  res.redirect("/?createPost=success");
});

module.exports = {
  showCreatePostForm,
  showAllPosts,
  createPost,
};
