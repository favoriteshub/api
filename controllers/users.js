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
		refreshToken: user.getJWT(true)
	});
}

module.exports = {newUser};
