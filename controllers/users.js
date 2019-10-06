const User = require("../models/User");
const {to, resErr, resSucc} = require("../services/response");

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
			.populate({path: "library.shows", model: "Show"})
	);

	if (err) {
		return resErr(res, err);
	}
	return resSucc(res, data.library.shows);
}

async function addLibraryShow(req, res) {
	const [err, data] = await to(User.updateOne({_id: req.user._id}, {$push: {"library.shows": req.params.id}}));

	if (err) {
		return resErr(res, err);
	}
	return resSucc(res, data);
}

async function removeLibraryShow(req, res) {
	const [err, data] = await to(User.updateOne({_id: req.user._id}, {$pullAll: {"library.shows": [req.params.id]}}));

	if (err) {
		return resErr(res, err);
	}
	return resSucc(res, data);
}

module.exports = {newUser, getLibraryShows, addLibraryShow, removeLibraryShow};
