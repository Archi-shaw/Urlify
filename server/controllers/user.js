const User = require('../models/user');
const { setUser } = require('../service/auth');

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
    return res.redirect('/');
  } catch (err) {
    return res.status(500).send("Error creating user: " + err.message);
  }
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", {
      error: "Invalid email or password",
    });
  }

  const token = setUser(user);
  res.cookie("token", `Bearer ${token}`, { httpOnly: true });
  return res.redirect('/');
}

module.exports = { handleUserSignup, handleUserLogin };
