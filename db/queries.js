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

// Insert new post
async function createPost(post) {
  const { title, content, user_id } = post;

  sql = `INSERT INTO posts (title, content, user_id)
       VALUES ($1, $2, $3)
       RETURNING id`;

  const { rows } = await pool.query(sql, [title, content, user_id]);

  return rows[0]?.id;
}

// Get all posts
async function getPosts() {
  sql = `SELECT * FROM posts`;

  const { rows } = await pool.query(sql);

  return rows;
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  createPost,
  getPosts,
};
