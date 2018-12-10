const router = require("express").Router();
const controller = require("../controllers/auth");

router.route("/register").post(controller.newUser);

router.route("/login").post(controller.login);

router.route("/refresh").post(controller.refreshToken);

module.exports = router;
