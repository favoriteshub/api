const User = require("../models/User");
const Show = require("../models/Show");
const { to, resErr, resSucc } = require("../services/response");

async function newUser(req, res) {
	const [err, user] = await to(User.create(req.body));

	if (err) {
		return resErr(res, "User already exists with that username");
	}

	return resSucc(res, {
		...user.getPublicFields(),
		token: user.getJWT(),
		refreshToken: user.getRefreshJWT()
	});
}

async function getLibraryShows(req, res) {
	const [err, data] = await to(
		User.findById(req.user._id)
			.select("library.shows")
			.populate({ path: "library.shows", model: "Show", select: "-_id -__v" })
	);

	if (err) {
		return resErr(res, err);
	}
	return resSucc(res, data.library.shows);
}

async function addLibraryShow(req, res) {
	const { id } = req.params;

	let [err, data] = await to(
		Show.findOne({ id })
			.select("-__v")
			.lean()
	);

	const { _id: showId, ...show } = data;

	[err, data] = await to(User.updateOne({ _id: req.user._id }, { $push: { "library.shows": showId } }));

	if (err) {
		return resErr(res, err);
	}
	return resSucc(res, show);
}

async function removeLibraryShow(req, res) {
	const { id } = req.params;

	let [err, data] = await to(Show.findOne({ id }).select("_id"));

	const showId = data._id;

	[err, data] = await to(User.updateOne({ _id: req.user._id }, { $pullAll: { "library.shows": [showId] } }));

	if (err) {
		return resErr(res, err);
	}
	return resSucc(res, data);
}

module.exports = { newUser, getLibraryShows, addLibraryShow, removeLibraryShow };
