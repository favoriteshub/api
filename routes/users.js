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
router.route("/").post(controller.newUser);

router.route("/shows").get(passport.authenticate("jwt", {session: false}), controller.getLibraryShows);

router.route("/shows/:id").post(passport.authenticate("jwt", {session: false}), controller.updateLibraryShows);

router.route("/shows/:id").delete(passport.authenticate("jwt", {session: false}), controller.updateLibraryShows);

module.exports = router;
