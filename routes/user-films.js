const router = require("express").Router();
const controller = require("../controllers/user-films");

router.route("/").get(controller.getAll);

router
	.route("/:filmId")
	.post(controller.update)
	.delete(controller.update);

module.exports = router;
