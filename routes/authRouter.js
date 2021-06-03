const router = require("express").Router();
const controller = require("../controllers/AuthController");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/check", controller.isUserLoggedIn);

module.exports = router;
