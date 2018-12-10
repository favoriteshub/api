const Film = require("../models/Film");
const searchConfig = require("../configuration/search.json");
const {to, resErr, resSucc} = require("../services/response");

const newFilm = async (req, res) => {
	const [err, film] = await to(Film.create(req.body));

	if (err) {
		return resErr(res, err);
	}
	return resSucc(res, film);
};

const searchByTitleCount = async (req, res) => {
	const [err, count] = await to(Film.count({title: {$regex: req.query.title, $options: "i"}}));

	if (err) {
		return resErr(res, err);
	}
	return resSucc(res, {
		count,
		pages: Math.ceil(count / searchConfig.elementsPerPage)
	});
};

const searchByTitlePaged = async (req, res) => {
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
};

const getOne = async (req, res) => {
	const [err, film] = await to(Film.findById(req.params.id));

	if (err) {
		return resErr(res, err);
	} else if (!film) {
		return resErr(res, "This Film does not exist");
	}
	return resSucc(res, film);
};

const updateOne = async (req, res) => {
	const [err, data] = await to(Film.updateOne({_id: req.params.id}, req.body));

	if (err) {
		return resErr(res, err);
	}
	return resSucc(res, data);
};

module.exports = {newFilm, searchByTitleCount, searchByTitlePaged, getOne, updateOne};
