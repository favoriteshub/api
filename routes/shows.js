const router = require("express").Router();
const passport = require("../services/passport");
const theTVDBController = require("../controllers/the-tv-db");
const showsController = require("../controllers/shows");

router.get("/search", passport.authenticate("jwt", {session: false}), theTVDBController.searchByName);

/**
 * @swagger
 *
 * /api/shows/{id}:
 *   get:
 *     tags:
 *       - shows
 *     summary: Retrieve show information
 *     operationId: getShowInfo
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type:
 *             - integer
 *             - string
 *         required: true
 *         example: 74205
 *       - in: query
 *         name: thetvdb
 *         description: If the provided id is from TheTVDB
 *         schema:
 *           type: boolean
 *           default: false
 *         example: true
 */
router.route("/:id").get(showsController.getShowInfo);

router.get("/:id/seasons/:season", passport.authenticate("jwt", {session: false}), theTVDBController.seriesSeason);

module.exports = router;
