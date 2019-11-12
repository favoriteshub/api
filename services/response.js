const { to } = require("await-to-js");

async function awaitTo(promise) {
	let err, res;
	[err, res] = await to(promise);

	if (err) {
		return [err, null];
	}
	return [null, res];
}

function resErr(res, err) {
	res.statusCode = 400;
	return res.json({
		error: typeof err == "object" && typeof err.message != "undefined" ? err.message : err
	});
}

function resSucc(res, data) {
	return res.json(data);
}

module.exports = { to: awaitTo, resErr, resSucc };
