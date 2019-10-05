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

router.get("/shows", passport.authenticate("jwt", {session: false}), controller.getLibraryShows);

router.post("/shows/:id", passport.authenticate("jwt", {session: false}), controller.updateLibraryShows);

router.delete("/shows/:id", passport.authenticate("jwt", {session: false}), controller.updateLibraryShows);

module.exports = router;
