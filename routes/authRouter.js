const router = require("express").Router();
const controller = require("../controllers/AuthController");
const passport = require("passport");
const authMiddleware = require("../middleware/auth");

router.post("/register", controller.register);
router.post("/login", controller.login);

router.get(
  "/login_google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.GOOGLE_FAILURE_REDIRECT,
    successRedirect: process.env.GOOGLE_SUCCESS_REDIRECT,
  }),
  (req, res) => {
    res.send("Thank you for signing in!");
  }
);

router.post("/test", authMiddleware.isLoggedIn, controller.isUserLoggedIn);

module.exports = router;
