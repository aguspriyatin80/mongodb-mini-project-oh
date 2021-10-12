const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const tokenGenerator = (user) => {
  const { _id, username } = user;

  return jwt.sign(
    {
      _id,
      username,
    },
    secretKey
  );
};

const tokenVerifier = (token) => {
  return jwt.verify(token, secretKey);
};

module.exports = {
  tokenGenerator,
  tokenVerifier,
};
