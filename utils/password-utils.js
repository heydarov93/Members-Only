const bcrypt = require("bcryptjs");

async function genPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function validPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

module.exports = {
  genPassword,
  validPassword,
};
