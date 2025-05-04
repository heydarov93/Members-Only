const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
email VARCHAR(255) UNIQUE NOT NULL,
password TEXT NOT NULL,
first_name VARCHAR(100) NOT NULL,
last_name VARCHAR(100) NOT NULL,
is_member BOOLEAN DEFAULT false,
is_admin BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS posts (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
title VARCHAR(255) NOT NULL,
content TEXT NOT NULL,
user_id INTEGER REFERENCES users,
created_at TIMESTAMP DEFAULT NOW()
);
`;

async function main() {
  console.log("Seeding ...");
  const client = new Client({
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSW}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  });

  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
