const router = require("express").Router();
const authController = require("../controllers/auth.controller");

router.route("/register").post(authController.createUser);

router.route("/login").post(authController.authUser);

module.exports = router;
