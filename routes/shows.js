const router = require("express").Router();
const Show = require("../models/Show");
const asyncMiddleware = require("../utils/asyncMiddleware");
const config = require("../configuration/search.json");

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

   router.route("/:page")
	.get(
		asyncMiddleware(async (req, res, next) => {
      let size = config.pageSize ;
      let page = req.params.page;
      var responsFilm = await Show.find().sort({title:1}).skip(size * page ).limit(size);
      res.json(responsFilm);

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
