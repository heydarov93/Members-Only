const express = require("express");
const path = require("node:path");
const indexRouter = require("./routes/index-router");
const usersRouter = require("./routes/users-router");
const postsRouter = require("./routes/posts-router");
const authRouter = require("./routes/auth-router");
require("dotenv").config();

const app = express();

// Tell application where to look for templates
app.set("views", path.join(__dirname, "views"));

// Set view engine
app.set("view engine", "ejs");

// Register directory to retrieve static files (css, js, img etc.) from
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// Allow express to use form data (extended: true lets to parse nested objects)
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/", indexRouter);

// If route not found
app.use((req, res, next) =>
  res
    .status(404)
    .render("error", { statusCode: 404, message: "Page Not found!" })
);

// Register error middleware
app.use((error, req, res, next) => {
  console.log(error);

  if (!error.statusCode) {
    res
      .status(500)
      .render("error", { statusCode: 500, message: "Internal Server Error" });
    return;
  }

  res
    .status(error.statusCode)
    .render("error", { statusCode: error.statusCode, message: error.message });
});

app.listen(process.env.APP_PORT, () =>
  console.log("App listens on port: ", process.env.APP_PORT)
);
