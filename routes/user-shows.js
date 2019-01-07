const router = require("express").Router();
const controller = require("../controllers/user-shows");

router.route("/").get(controller.getAll);

router
	.route("/:id")
	.post(controller.add)
	.delete(controller.del);

module.exports = router;
