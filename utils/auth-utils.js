const util = require("util");

const logoutPromise = util.promisify((req, callback) => {
  req.logout(callback);
});

const isOwner = (ownerId, userId) => {
  return ownerId === userId;
};

module.exports = { logoutPromise, isOwner };
