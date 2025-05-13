const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const db = require("../db/queries");
const CustomNotFoundError = require("../error/CustomNotFoundError");

// Get bost by id
const getPost = asyncHandler(async (req, res, next) => {
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
  if (!post) throw new CustomNotFoundError("Post not found!");

  // Set post to req object
  req.post = post;

  next();
});

// Check if user is the owner of a post
const isOwner = (req, res, next) => {
  if (req.user.id === req.post.user_id) {
    return next();
  }

  throw new CustomNotFoundError("Post not found!");
};

// Check if user is an admin or the user
const isAdminOrOwner = (req, res, next) => {
  if (req.user.id === req.post.user_id || req.user.is_admin) {
    return next();
  }

  throw new CustomNotFoundError("Post not found!");
};

module.exports = { getPost, isOwner, isAdminOrOwner };
