const router = require("express").Router();
const authController = require("../controllers/auth.controller");

router.route("/register").post(authController.newUser);

router.route("/login").post(authController.login);

router.route("/refresh").post(authController.refreshToken);

module.exports = router;
