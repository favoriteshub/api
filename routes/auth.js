const router = require("express").Router();
const controller = require("../controllers/auth");

/**
 * @swagger
 *
 * /api/auth/login:
 *   post:
 *     tags:
 *       - auth
 *     summary: Sign in
 *     operationId: login
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
 *             required:
 *               - username
 *               - password
 *           example:
 *             username: test
 *             password: testtest
 *     responses:
 *       200:
 *         $ref: '#/components/responses/AuthResponse'
 */
router.post("/login", controller.login);

/**
 * @swagger
 *
 * /api/auth/refresh:
 *   post:
 *     tags:
 *       - auth
 *     summary: Refresh authentication tokens
 *     operationId: refreshToken
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               refreshToken:
 *                 type: string
 *             required:
 *               - token
 *               - refreshToken
 *           example:
 *             token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDY1OTc4NzAxNmYyNzY2YWEwM2I3NjIiLCJpYXQiOjE1NjY5MzkwMTUsImV4cCI6MTU2Njk0MjYxNX0.UxcZm8lJhi9wufaLl5DKGU48G9Y9JQxV8gQNC-LsEQA
 *             refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDY1OTc4NzAxNmYyNzY2YWEwM2I3NjIiLCJpYXQiOjE1NjY5MzkwMTUsImV4cCI6MTU2NzAyNTQxNX0.iVZytxxlUl-K0MTb_fZV1OYagKVV3GydjDGATWSOwlI
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *             example:
 *               token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDY1OTc4NzAxNmYyNzY2YWEwM2I3NjIiLCJpYXQiOjE1NjY5Mzk5NDUsImV4cCI6MTU2Njk0MzU0NX0.xBA3jXl5aKgWwsN2qYGZn-R5HF2YN4w_71f6jvrfmzI
 *               refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDY1OTc4NzAxNmYyNzY2YWEwM2I3NjIiLCJpYXQiOjE1NjY5Mzk5NDUsImV4cCI6MTU2NzAyNjM0NX0.VZWYtK2f5_kQqusA-FkxxWMpT5p2oQXInixKZDE33os
 */
router.post("/refresh", controller.refreshToken);

module.exports = router;
