const router = require("express").Router();
const controller = require("../controllers/users");

router.route("/").delete(controller.del);

module.exports = router;
