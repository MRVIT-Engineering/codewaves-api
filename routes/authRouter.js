const router = require("express").Router();
const controller = require("../controllers/AuthController");
const passport = require("passport");

router.post("/register", controller.register);
router.post("/login", controller.login);

router.get(
  "/login_google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google_callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    console.log("Google callback response: ", response);
  }
);

router.get("/check", controller.isUserLoggedIn);

module.exports = router;
