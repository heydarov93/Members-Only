const util = require("util");

const logoutPromise = util.promisify((req, callback) => {
  req.logout(callback);
});

module.exports = { logoutPromise };
