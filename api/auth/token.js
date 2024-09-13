const jwt = require("jsonwebtoken");

const TOKEN_SECRET_KEY =
  "#this-is-just-a-project-that-is-why-i-put-secret-key-here#";

// Sign a token
const signToken = (payload) => {
  const token = jwt.sign(payload, TOKEN_SECRET_KEY);
  return token;
};

// Verify Token
const verifyToken = (token) => {
  try {
    const verification = jwt.verify(token, TOKEN_SECRET_KEY);
    return verification;
  } catch (error) {
    error = JSON.parse(JSON.stringify(error));
    return error;
  }
};

module.exports = {
  signToken,
  verifyToken,
};
