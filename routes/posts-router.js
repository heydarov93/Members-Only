const { Router } = require("express");
const postsController = require("../controllers/posts-controller");
const { isAuth, isAdmin } = require("../middlewares/auth-middlewares");
const {
  validatePostSubmission,
  validatePostParams,
} = require("../middlewares/validate-post");

const router = Router();

// Show all posts
router.get("/", postsController.showAllPosts);

// Show create post form
router.get("/create", isAuth, postsController.showCreatePostForm);

// Create a post
router.post(
  "/create",
  isAuth,
  validatePostSubmission,
  postsController.createPost
);

// Show update post form
router.get(
  "/update/:id",
  isAuth,
  validatePostParams,
  postsController.showUpdatePostForm
);

// Update a post
router.post(
  "/update/:id",
  isAuth,
  validatePostParams,
  validatePostSubmission,
  postsController.updatePost
);

// Show delete post form
router.get(
  "/delete/:id",
  isAuth,
  validatePostParams,
  postsController.showDeletePostForm
);

// Delete a post
router.post(
  "/delete/:id",
  isAuth,
  validatePostParams,
  postsController.deletePost
);

// Show post deatils
router.get(
  "/:id",
  isAuth,
  validatePostParams,
  postsMiddlewares.getPost,
  postsController.showPostDetails
);

module.exports = router;
