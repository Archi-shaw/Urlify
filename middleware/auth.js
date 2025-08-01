const { getUser } = require('../service/auth');

function checkForAuthentication(req, res, next) {
  req.user = null;

  const token = req.cookies?.token?.split('Bearer ')[1];

  if (!token) return next();

  const user = getUser(token);
  if (user) req.user = user;

  next();
}

function restrictTo(roles = []) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).send("Unauthorized");
    }
    next();
  };
}

module.exports = { checkForAuthentication, restrictTo };
