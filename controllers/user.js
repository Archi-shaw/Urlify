const User = require('../models/user');
const URL = require('../models/url');

async function handleUserSignup(req,res) {
    const { name, email,password} = req.body;
    const allUrls = await URL.find({});
    await User.create({
        name,
        email,
        password,
    });

    return res.redirect("/");
}

async function handleUserLogin(req,res) {
    const {email,password} = req.body;
    const user = await URL.find({email, password});
  if(!user) { return res.render("login", {
     error : "Invalid email or password",
  })
  }
    return res.redirect("/");
}


module.exports = {
    handleUserSignup,
    handleUserLogin,
}