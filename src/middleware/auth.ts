module.exports = {
  isLoggedIn(req: any, res: any, next: () => void) {
    if (req.isAuthenticated()) return next();
    else res.status(401).send();
  },
};
