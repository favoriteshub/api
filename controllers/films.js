const Film = require("../models/Film");
const {to, resErr, resSucc} = require("../services/response");

async function newFilm(req, res) {
	const [err, film] = await to(Film.create(req.body));

	if (err) {
		return resErr(res, err);
	}
	return resSucc(res, film);
}

async function searchByTitleCount(req, res) {
	const [err, count] = await to(Film.count({title: {$regex: req.query.title, $options: "i"}}));

	if (err) {
		return resErr(res, err);
	}
	return resSucc(res, {
		count,
		pages: req.query.limit ? Math.ceil(count / req.query.limit) : undefined
	});
}

async function searchByTitlePaged(req, res) {
	const [err, film] = await to(
		Film.find({title: {$regex: req.query.title, $options: "i"}})
			.sort({title: 1})
			.skip(req.query.limit * req.params.page)
			.limit(parseInt(req.query.limit))
	);

	if (err) {
		return resErr(res, err);
	}
	return resSucc(res, film);
}

async function getOne(req, res) {
	const [err, film] = await to(Film.findById(req.params.id));

	if (err) {
		return resErr(res, err);
	} else if (!film) {
		return resErr(res, "This Film does not exist");
	}
	return resSucc(res, film);
}

async function updateOne(req, res) {
	const [err, data] = await to(Film.updateOne({_id: req.params.id}, req.body));

	if (err) {
		return resErr(res, err);
	}
	return resSucc(res, data);
}

module.exports = {newFilm, searchByTitleCount, searchByTitlePaged, getOne, updateOne};
