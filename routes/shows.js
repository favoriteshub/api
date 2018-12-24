const router = require("express").Router();
const showsController = require("../controllers/shows");
const thetvdbController = require("../controllers/the-tv-db");

router.route("/").post(showsController.newShow);

// router.route("/search/count").get(showsController.searchByTitleCount);
// router.route("/search").get(showsController.searchByTitlePaged);

router.route("/search").get(thetvdbController.searchByName);

router.route("/:id/info").get(thetvdbController.seriesInfo);
router.route("/:id/episodes").get(thetvdbController.seriesEpisodes);

router
	.route("/:id")
	.get(showsController.getOne)
	.put(showsController.updateOne);

module.exports = router;
