const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Favorites Hub API",
			version: process.env.npm_package_version
		}
	},
	apis: ["routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;

/**
 * @swagger
 *
 * components:
 *   # Reusable responses, such as 401 Unauthorized or 400 Bad Request
 *   responses:
 *     AuthResponse:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               token:
 *                 type: string
 *               refreshToken:
 *                 type: string
 *           example:
 *             username: test
 *             email: test@test.test
 *             token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDY1OTc4NzAxNmYyNzY2YWEwM2I3NjIiLCJpYXQiOjE1NjY5MzkwMTUsImV4cCI6MTU2Njk0MjYxNX0.UxcZm8lJhi9wufaLl5DKGU48G9Y9JQxV8gQNC-LsEQA
 *             refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDY1OTc4NzAxNmYyNzY2YWEwM2I3NjIiLCJpYXQiOjE1NjY5MzkwMTUsImV4cCI6MTU2NzAyNTQxNX0.iVZytxxlUl-K0MTb_fZV1OYagKVV3GydjDGATWSOwlI
 */
