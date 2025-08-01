const { getUser } = require('../service/auth');

function checkForAuthentication(req, res, next) {
  req.user = null;

  const token = req.cookies?.token?.split('Bearer ')[1];

  if (!token) return next();

  const user = getUser(token);
  if (user) req.user = user;

  next();
}



module.exports = { checkForAuthentication};
