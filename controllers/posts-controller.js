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
const showUpdatePostForm = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Get validation results for req.params.id
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // If id is invalid just throw 404
    throw new CustomNotFoundError(errors.errors[0].msg);
  }

  // If no error get post
  const post = await db.getPostById(id);

  // If no post for an entered id or if current user is not the owner of the post throw 404
  if (!post || !isOwner(post.user_id, req.user.id)) {
    throw new CustomNotFoundError("Post not found!");
  }

  // If the post submission process fails, form values are stored in the session
  // This prevents the user from losing their input — a better user experience
  if (req.session.formValues) {
    res.locals.post = req.session.formValues;

    // Make sure to insert an id of the post
    req.locals.post.id = id;
    delete req.session.formValues;
    return res.render("post-form");
  }

  res.render("post-form", { post });
});

/* ======================== */
// Update a post
const updatePost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;

  // Get validation errors, if any
  const errors = validationResult(req);

  // If there is an error, render create post form page with user entered data and error messages
  if (!errors.isEmpty()) {
    // Errors contain both params and body related errors, so get params.id error to display appropriate error message
    const invalidIdError = errors.errors.find(
      (error) => error.location === "params"
    );

    if (invalidIdError) throw new CustomNotFoundError(invalidIdError.msg);

    return res.render("post-form", {
      errors: errors.errors,
      post: { id, title, content },
    });
  }

  // Fetch post and get author id
  const { user_id } = await db.getPostById(id);

  // Check if current user is the owner of the post
  if (!isOwner(user_id, req.user.id))
    throw new CustomNotFoundError("Post not found!");

  const updatedPostId = await db.updatePost({
    id,
    title,
    content,
  });

  // If updating post failed, redirect user to update post page and set update post status to fail
  if (!updatedPostId) {
    req.session.formValues = { title, content };
    return res.redirect(`/posts/update/${id}?updatePost=fail`);
  }

  // If post updated successfully, redirect user to home page and set update post status to success
  res.redirect("/?updatePost=success");
});

/* ======================== */
// Display delete post form
const showDeletePostForm = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Get validation results for req.params.id
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // If id is invalid just throw 404
    throw new CustomNotFoundError(errors.errors[0].msg);
  }

  // If no error get post
  const post = await db.getPostById(id);

  // If no post for an entered id or if current user is not the owner of the post or if user is not an admin throw 404
  if (!post || !(isOwner(post.user_id, req.user.id) || req.user.is_admin)) {
    throw new CustomNotFoundError("Post not found!");
  }

  res.render("delete-post", { post, formatDate });
});

/* ======================== */
// Delete post
const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Get validation results for req.params.id
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // If id is invalid just throw 404
    throw new CustomNotFoundError(errors.errors[0].msg);
  }

  // If no error get post
  const post = await db.getPostById(id);

  // If no post for an entered id or if current user is not the owner of the post or if user is not an admin throw 404
  if (!post || !(isOwner(post.user_id, req.user.id) || req.user.is_admin)) {
    throw new CustomNotFoundError("Post not found!");
  }

  const deletePostId = await db.deletePost(id);

  // If deleting post failed, redirect user to delete post page and set update post status to fail
  if (!deletePostId) {
    return res.redirect(`/posts/delete/${id}?deletePost=fail`);
  }

  // If post deleted successfully, redirect user to home page and set delete post status to success
  res.redirect("/?deletePost=success");
});

module.exports = {
  showCreatePostForm,
  showAllPosts,
  createPost,
  showUpdatePostForm,
  updatePost,
  showDeletePostForm,
  deletePost,
};
