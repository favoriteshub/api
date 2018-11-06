const router = require("express").Router();
const userfilmsController = require("../controllers/user-films.controller");

router.route("/").get(userfilmsController.getAll);

router
  .route("/:showId")
  .post(userfilmsController.update)
  .delete(userfilmsController.update);

module.exports = router;
