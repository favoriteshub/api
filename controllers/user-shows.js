const User = require("../models/User");
const Show = require("../models/Show");
const TheTVDB = require("../services/TheTVDB");
const {to, resErr, resSucc} = require("../services/response");

async function getAll(req, res) {
	const [err, data] = await to(
		User.findById(req.user._id)
			.populate({path: "shows_list", select: "-_id -__v -user_id", match: {user_id: req.user._id}})
			.lean()
	);

	if (err) {
		return resErr(res, err);
	}
	return resSucc(res, data.shows_list || []);
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
		Show.create({
			title: info.seriesName,
			id: info.id,
			poster: TheTVDB.getImageURL(posters[0].fileName, "poster"),
			user_id: req.user._id
		})
	);

	if (err) {
		return resErr(res, err);
	}

	let data = null;
	[err, data] = await to(User.updateOne({_id: req.user._id}, {$push: {shows: req.params.id}}));

	if (err) {
		return resErr(res, err);
	}
	return resSucc(res, show.getPublicFields());
}

async function del(req, res) {
	let [err, data] = await to(Show.deleteOne({id: req.params.id, user_id: req.user._id}));

	if (err) {
		return resErr(res, err);
	}

	[err, data] = await to(User.updateOne({_id: req.user._id}, {$pullAll: {shows: [req.params.id]}}));

	if (err) {
		return resErr(res, err);
	}
	return resSucc(res);
}

module.exports = {getAll, add, del};
