const User = require("../models/User");
const Show = require("../models/Show");
const TheTVDB = require("../services/TheTVDB");
const {to, resErr, resSucc} = require("../services/response");

async function getAll(req, res) {
	const [err, data] = await to(
		User.findById(req.user._id)
			.select("library.shows")
			.populate({path: "library.shows", model: "Show"})
	);

	if (err) {
		return resErr(res, err);
	}
	return resSucc(res, data.library.shows);
}

async function add(req, res) {
	let [err, responses] = await to(
		Promise.all([TheTVDB.seriesInfo(req.params.id, true), TheTVDB.seriesPosters(req.params.id)])
	);

	if (err) {
		return resErr(res, err);
	}

	let info = responses[0].data.data;
	let posters = responses[1].data.data;

	let show = null;
	[err, show] = await to(
		Show.create({id: info.id, poster: TheTVDB.getImageURL(posters[0].fileName, "poster"), title: info.seriesName})
	);

	if (err) {
		return resErr(res, err);
	}

	let data = null;
	[err, data] = await to(User.updateOne({_id: req.user._id}, {$push: {"library.shows": show._id}}));

	if (err) {
		return resErr(res, err);
	}
	return resSucc(res, data);
}

async function del(req, res) {
	const [err, data] = await to(User.updateOne({_id: req.user._id}, {$pullAll: {"library.shows": [req.params.id]}}));

	if (err) {
		return resErr(res, err);
	}
	return resSucc(res, data);
}

module.exports = {getAll, add, del};
