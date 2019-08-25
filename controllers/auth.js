const User = require("../models/User");
const {to, resErr, resSucc} = require("../services/response");
const jwt = require("jsonwebtoken");

async function login(req, res) {
	let user;

	if (!req.body.username) {
		return resErr(res, "Please enter a username to login");
	} else if (!req.body.password) {
		return resErr(res, "Please enter a password to login");
	} else {
		user = await User.findOne({username: req.body.username});

		if (!user) {
			return resErr(res, "Please enter an existing username");
		}
	}

	const err = await user.comparePassword(req.body.password);

	if (err) {
		return resErr(res, err);
	}
	return resSucc(res, {
		...user.getPublicFields(),
		token: user.getJWT(),
		refreshToken: user.getJWT(true)
	});
}

async function refreshToken(req, res) {
	const oldToken = jwt.decode(req.body.token);

	if (!oldToken) {
		return resErr(res, "Invalid token");
	} else {
		jwt.verify(req.body.refreshToken, process.env.REFRESH_JWT_ENCRYPTION, async (error, decoded) => {
			if (decoded && oldToken.iat === decoded.iat) {
				const [err, user] = await to(User.findById(decoded.userId));

				if (err) {
					return resErr(res, err);
				}
				return resSucc(res, {token: user.getJWT(), refreshToken: user.getJWT(true)});
			}
			return resErr(res, error);
		});
	}
}

module.exports = {login, refreshToken};
