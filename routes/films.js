const router = require("express").Router();
const filmsController = require("../controllers/films.controller");

router.route("/").post(filmsController.newFilm);

router.route("/search/count").get(filmsController.searchByTitleCount);
router.route("/search/:page(\\d+)").get(filmsController.searchByTitlePaged);

router
  .route("/:id")
  .get(filmsController.getOne)
  .put(filmsController.updateOne);

module.exports = router;
