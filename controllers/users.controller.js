const User = require("../models/User");
const {to, resErr, resSucc} = require("../services/response");

const del = async (req, res) => {
	const [err, data] = await to(User.deleteOne({_id: req.user._id}));

	if (err) {
		return resErr(res, "Could not delete user");
	}
	return resSucc(res, data);
};

module.exports = {del};
