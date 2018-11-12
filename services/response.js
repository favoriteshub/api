const {to} = require("await-to-js");

const awaitTo = async (promise) => {
	let err, res;
	[err, res] = await to(promise);

	if (err) {
		return [err, null];
	}
	return [null, res];
};

const resErr = function(res, err) {
	res.statusCode = 400;
	return res.json({
		error: typeof err == "object" && typeof err.message != "undefined" ? err.message : err
	});
};

const resSucc = function(res, data) {
	return res.json(data);
};

module.exports = {to: awaitTo, resErr, resSucc};
