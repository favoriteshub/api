const router = require("express").Router();
const userShowsController = require("../controllers/user-shows.controller");

router.route("/").get(userShowsController.getAll);

router
	.route("/:showId")
	.post(userShowsController.update)
	.delete(userShowsController.update);

module.exports = router;
