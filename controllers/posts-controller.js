const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const { validationResult } = require("express-validator");
const CustomNotFoundError = require("../error/CustomNotFoundError");
const { isOwner } = require("../utils/auth-utils");
const CustomForbiddenError = require("../error/CustomForbiddenError");
const { formatDate } = require("../utils/format-date");

/* ======================== */
// Display all posts
const showAllPosts = (req, res) => {
  // Home page controller fetches all posts
  res.redirect("/");
};

/* ======================== */
// Display add post form
const showCreatePostForm = (req, res) => {
  // If the post submission process fails, form values are stored in the session
  // This prevents the user from losing their input — a better user experience
  if (req.session.formValues) {
    res.locals.post = req.session.formValues;
    delete req.session.formValues;
  }

  res.render("post-form");
};

/* ======================== */
// Add new post
const createPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  // Get validation errors, if any
  const errors = validationResult(req);

  // If there is an error, render create post form page with user entered data and error messages
  if (!errors.isEmpty()) {
    return res.render("post-form", {
      errors: errors.errors,
      post: { title, content },
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

/* ======================== */
// Display update post form
const showUpdatePostForm = (req, res) => {
  // If the post submission process fails, form values are stored in the session
  // This prevents the user from losing their input — a better user experience
  if (req.session.formValues) {
    res.locals.post = req.session.formValues;

    // Make sure to insert an id of the post
    req.locals.post.id = id;
    delete req.session.formValues;
    return res.render("post-form");
  }

  res.render("post-form", { post: req.post });
};

/* ======================== */
// Update a post
const updatePost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  // Get validation errors, if any
  const errors = validationResult(req);

  // If there is an error, render create post form page with user entered data and error messages
  if (!errors.isEmpty()) {
    return res.render("post-form", {
      errors: errors.errors,
      post: { id: req.post.id, title, content },
    });
  }

  const updatedPostId = await db.updatePost({
    id: req.post.id,
    title,
    content,
  });

  // If updating post failed, redirect user to update post page and set update post status to fail
  if (!updatedPostId) {
    req.session.formValues = { title, content };
    return res.redirect(`/posts/update/${req.post.id}?updatePost=fail`);
  }

  // If post updated successfully, redirect user to home page and set update post status to success
  res.redirect("/?updatePost=success");
});

/* ======================== */
// Display delete post form
const showDeletePostForm = asyncHandler(async (req, res) => {
  res.render("delete-post", { post: req.post, formatDate });
});

/* ======================== */
// Delete post
const deletePost = asyncHandler(async (req, res) => {
  const deletePostId = await db.deletePost(req.post.id);

  // If deleting post failed, redirect user to delete post page and set update post status to fail
  if (!deletePostId) {
    return res.redirect(`/posts/delete/${req.post.id}?deletePost=fail`);
  }

  // If post deleted successfully, redirect user to home page and set delete post status to success
  res.redirect("/?deletePost=success");
});

/* ======================== */
// Delete post
const showPostDetails = asyncHandler(async (req, res) => {
  res.render("post-details", { post: req.post, formatDate });
});

module.exports = {
  showCreatePostForm,
  showAllPosts,
  createPost,
  showUpdatePostForm,
  updatePost,
  showDeletePostForm,
  deletePost,
  showPostDetails,
};
