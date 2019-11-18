const router = require("express").Router();
const controller = require("../controllers/users");
const passport = require("../services/passport");

/**
 * @swagger
 *
 * /api/users:
 *   post:
 *     tags:
 *       - users
 *     summary: Sign up
 *     operationId: newUser
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *           example:
 *             username: test
 *             password: testtest
 *             email: test@test.test
 *     responses:
 *       200:
 *         $ref: '#/components/responses/AuthResponse'
 */
router.post("/", controller.newUser);

/**
 * @swagger
 *
 * /api/users/shows:
 *   get:
 *     tags:
 *       - users
 *     summary: Retrieve user's favorite shows
 *     operationId: getLibraryShows
 *     security:
 *       - BearerToken: []
 *     responses:
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get("/shows", passport.authenticate("jwt", { session: false }), controller.getLibraryShows);

/**
 * @swagger
 *
 * /api/users/shows/{id}:
 *   post:
 *     tags:
 *       - users
 *     summary: Add a show to the user's favorites
 *     operationId: addLibraryShow
 *     security:
 *       - BearerToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         example: 1
 *     responses:
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.post("/shows/:id", passport.authenticate("jwt", { session: false }), controller.addLibraryShow);

/**
 * @swagger
 *
 * /api/users/shows/{id}:
 *   delete:
 *     tags:
 *       - users
 *     summary: Remove a show from the user's favorites
 *     operationId: removeLibraryShow
 *     security:
 *       - BearerToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         example: 1
 *     responses:
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.delete("/shows/:id", passport.authenticate("jwt", { session: false }), controller.removeLibraryShow);

module.exports = router;
