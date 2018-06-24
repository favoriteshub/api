const router = require("express").Router();
const Show = require("../models/Show");
const asyncMiddleware = require("../utils/asyncMiddleware");

router.route("/")
	.get(
		asyncMiddleware(async (req, res, next) => {
			res.json(await Show.find());
		})
	)
	.post(
		asyncMiddleware(async (req, res, next) => {
			res.json(await Show.create(req.body));
		})
	);

router.route("/:id")
	.get(
		asyncMiddleware(async (req, res, next) => {
			res.json(await Show.find({_id: req.params.id}));
		})
	)
	.delete(
		asyncMiddleware(async (req, res, next) => {
			res.json(await Show.deleteOne({_id: req.params.id}));
		})
	)
	.put(
		asyncMiddleware(async (req, res, next) => {
			res.json(await Show.updateOne({_id: req.params.id}, req.body));
		})
	);

module.exports = router;
