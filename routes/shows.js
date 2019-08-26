const router = require("express").Router();
const controller = require("../controllers/shows");

/**
 * @swagger
 *
 * /api/shows/search:
 *   get:
 *     tags:
 *       - shows
 *     operationId: search
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         example: sopranos
 *       - in: query
 *         name: thetvdb
 *         description: If the search should be done using the TheTVDB API
 *         schema:
 *           type: boolean
 *           default: false
 *       - in: query
 *         name: limit
 *         description: Maximum number of results
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: start
 *         description: Page of results to show
 *         schema:
 *           type: integer
 *           default: 0
 */
router.get("/search", controller.search);

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
router.get("/:id", controller.getShowInfo);

/**
 * @swagger
 *
 * /api/shows/{thetvdbId}/seasons:
 *   get:
 *     tags:
 *       - shows
 *     summary: Retrieve show episodes divided by season
 *     operationId: getShowSeasons
 *     parameters:
 *       - in: path
 *         name: thetvdbId
 *         description: TheTVDB id for the show
 *         schema:
 *           type: integer
 *         required: true
 *         example: 75299
 */
router.get("/:thetvdbId/seasons", controller.getShowSeasons);

module.exports = router;
