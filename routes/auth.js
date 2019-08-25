const router = require("express").Router();
const controller = require("../controllers/auth");

router.route("/login").post(controller.login);

router.route("/refresh").post(controller.refreshToken);

module.exports = router;
