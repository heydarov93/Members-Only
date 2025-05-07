const { Router } = require("express");
const postsController = require("../controllers/posts-controller");
const { isAuth } = require("../middlewares/auth-middlewares");

const router = Router();

// Show all posts
router.get("/", postsController.showAllPosts);

// Show create post form
router.get("/create", isAuth, postsController.showCreatePostForm);

// Create a post
router.post("/create", isAuth, postsController.createPost);

// Show update post form
router.get("/update/:id", (req, res) =>
  res.send("Update post form: ", req.params.id)
);

// Update a post
router.post("/update/:id", (req, res) =>
  res.send("Post updated: ", req.params.id)
);

// Show delete post form
router.get("/delete/:id", (req, res) =>
  res.send("Delete post form: ", req.params.id)
);

// Delete a post
router.post("/delete/:id", (req, res) =>
  res.send("Post deleted: ", req.params.id)
);

module.exports = router;
