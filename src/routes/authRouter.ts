import { Router } from "express";
import passport from "passport";

const controller = require("../controllers/AuthController");
const authMiddleware = require("../middleware/auth");
const router = Router();

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
  (req: any, res: any) => {
    res.send("Thank you for signing in!");
  }
);

router.post("/test", authMiddleware.isLoggedIn, controller.isUserLoggedIn);

export default router;
