const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const db = require("../db/queries");
const { validPassword } = require("../utils/password-utils");

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

// Callback function that LocalStrategy will use
const verifyCallback = async (username, password, done) => {
  try {
    // Get user from db by username (email)
    const user = await db.getUserByEmail(username);

    // If user is not found return appropriate message
    if (!user) return done(null, false, { message: "Incorrect username" });

    // If user exists but his password is not matching to the password from db send error message
    if (!validPassword(password, user.password))
      return done(null, false, { message: "Incorrect password" });

    return done(null, user);
  } catch (error) {
    return done(error);
  }
};

const strategy = new LocalStrategy(customFields, verifyCallback);

// This will be called under the hood when we will call passport.authenticate
passport.use(strategy);

// These next two functions define what bit of information passport is looking for when it creates and then decodes the cookie.
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const rows = await db.getUserById(id);

    const user = rows[0];

    done(null, user);
  } catch (error) {
    done(error);
  }
});
