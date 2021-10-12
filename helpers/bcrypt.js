const bcrypt = require('bcrypt');
const saltRound = Number(process.env.SALT_ROUND);

const encryptPassword = (password) => bcrypt.hash(password, saltRound);
const decryptPassword = (password, userPassword) =>
  bcrypt.compare(password, userPassword);

module.exports = {
  encryptPassword,
  decryptPassword,
};
