const pool = require("../config/database");

// Insert new user
async function createUser(user) {
  const { email, hashPassword, first_name, last_name } = user;

  sql = `INSERT INTO users (email, password, first_name, last_name)
       VALUES ($1, $2, $3, $4)
       RETURNING id`;

  const { rows } = await pool.query(sql, [
    email,
    hashPassword,
    first_name,
    last_name,
  ]);

  return rows[0]?.id;
}

// Get user by email
async function getUserByEmail(email) {
  const { rows } = await pool.query("Select * FROM users WHERE email = $1", [
    email,
  ]);

  return rows[0];
}

// Get user by id
async function getUserById(id) {
  const { rows } = await pool.query("Select * FROM users WHERE id = $1", [id]);

  return rows;
}

// Assign role to user
async function grantRole(userId, role) {
  const sql =
    role === "admin" ? "is_admin = true, is_member = true" : "is_member = true";

  const { rows } = await pool.query(
    `UPDATE users SET ${sql} WHERE id = $1 RETURNING id`,
    [userId]
  );

  return rows[0]?.id;
}

// Insert new post
async function createPost(post) {
  const { title, content, user_id } = post;

  sql = `INSERT INTO posts (title, content, user_id)
       VALUES ($1, $2, $3)
       RETURNING id`;

  const { rows } = await pool.query(sql, [title, content, user_id]);

  return rows[0]?.id;
}

// Update a post
async function updatePost(post) {
  const { id, title, content } = post;

  sql = `UPDATE posts SET title = $1, content = $2
       WHERE id = $3
       RETURNING id`;

  const { rows } = await pool.query(sql, [title, content, id]);

  return rows[0]?.id;
}

// Get all posts
async function getPosts() {
  sql = `SELECT posts.*, users.first_name, users.last_name FROM posts JOIN users ON users.id = posts.user_id ORDER BY posts.created_at DESC`;

  const { rows } = await pool.query(sql);

  return rows;
}

// Get post by id
async function getPostById(id) {
  const { rows } = await pool.query(
    "Select posts.*, users.first_name, users.last_name  FROM posts JOIN users ON users.id = posts.user_id WHERE posts.id = $1",
    [id]
  );

  return rows[0];
}

// Delete post by id
async function deletePost(id) {
  const { rows } = await pool.query(
    "DELETE FROM posts WHERE id = $1 RETURNING id",
    [id]
  );

  return rows[0]?.id;
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  grantRole,
  createPost,
  updatePost,
  getPosts,
  getPostById,
  deletePost,
};
