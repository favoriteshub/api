const User = require("../models/User");
const {to, resErr, resSucc} = require("../services/response");

const getAll = async (req, res) => {
	const [err, data] = await to(
		User.findById(req.user._id)
			.select("library.films")
			.populate({path: "library.films", model: "Film"})
	);

	if (err) {
		return resErr(res, err);
	}
	return resSucc(res, data.library.films);
};

const update = async (req, res) => {
	let post = {$push: {"library.films": req.params.filmId}};
	let del = {$pullAll: {"library.films": [req.params.filmId]}};
	const [err, data] = await to(User.updateOne({_id: req.user._id}, req.method === "POST" ? post : del));

	if (err) {
		return resErr(res, err);
	}
	return resSucc(res, data);
};

module.exports = {getAll, update};
