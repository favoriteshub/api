const router = require("express").Router();
const usersController = require("../controllers/users.controller");

router.route("/").delete(usersController.del);

module.exports = router;
