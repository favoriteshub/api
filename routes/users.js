const router = require("express").Router();
const usersController = require("../controllers/users.controller");

router.route("/").delete(usersController.deleteUser);

module.exports = router;
