const router = require("express").Router();
const controller = require("../controllers/films");

router.route("/").post(controller.newFilm);

router.route("/search/count").get(controller.searchByTitleCount);
router.route("/search").get(controller.searchByTitlePaged);

router
	.route("/:id")
	.get(controller.getOne)
	.put(controller.updateOne);

module.exports = router;
