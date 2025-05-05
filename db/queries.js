const pool = require("../config/database");

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

async function getUserByEmail(email) {
  const { rows } = await pool.query("Select * FROM users WHERE email = $1", [
    email,
  ]);

  return rows[0];
}

async function getUserById(id) {
  const { rows } = await pool.query("Select * FROM users WHERE id = $1", [id]);

  return rows;
}

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
};
