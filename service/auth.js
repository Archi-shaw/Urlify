const jwt = require('jsonwebtoken');
const secret = "Archi@#$1234";

function setUser(user) {
  return jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    secret,
    { expiresIn: '1d' }
  );
}

function getUser(token) {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    console.error("JWT Error:", err.message);
    return null;
  }
}

module.exports = { setUser, getUser };
