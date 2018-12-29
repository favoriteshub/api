const router = require("express").Router();
const controller = require("../controllers/the-tv-db");

router.route("/search").get(controller.searchByName);

router.route("/:id").get(controller.seriesInfo);
router.route("/:id/seasons/:season").get(controller.seriesSeason);

module.exports = router;
