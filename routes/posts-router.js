const { Router } = require("express");

const router = Router();

// Show all posts
router.get("/", (req, res) => res.send("All posts"));

// Show create post form
router.get("/create", (req, res) => res.send("Create post form"));

// Create a post
router.post("/create", (req, res) => res.send("Post created"));

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
