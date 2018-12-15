const Film = require("../models/Film");
const searchConfig = require("../configuration/search.json");
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
		pages: Math.ceil(count / searchConfig.elementsPerPage)
	});
}

async function searchByTitlePaged(req, res) {
	let elementsPerPage = searchConfig.elementsPerPage;

	const [err, film] = await to(
		Film.find({title: {$regex: req.query.title, $options: "i"}})
			.sort({title: 1})
			.skip(elementsPerPage * req.params.page)
			.limit(elementsPerPage)
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
