const bcrypt = require('bcrypt');

function hashPassword(password) {
  return bcrypt.hash(password, 12);
}

function comparePassword(password, encrypted) {
  return bcrypt.compare(password, encrypted);
}

module.exports = {
  hashPassword,
  comparePassword,
};
