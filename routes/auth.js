const router = require("express").Router();
const authController = require("../controllers/auth.controller");

router.route("/register").post(authController.createUser);

module.exports = router;
