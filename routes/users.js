const router = require("express").Router();
const controller = require("../controllers/users");

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

module.exports = router;
