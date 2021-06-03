const isLoggedIn = (req, res, next) => {
  console.log(req.cookies);
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) return next();
  else res.status(401).send();
};

module.exports = { isLoggedIn };
