const router = require("express").Router();
const controller = require("../controllers/user-shows");

router.route("/").get(controller.getAll);

router
	.route("/:id")
	.post(controller.update)
	.delete(controller.update);

module.exports = router;
