async function to(promise) {
	try {
		const response = await promise;

		return [null, response];
	} catch (error) {
		return [error];
	}
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

module.exports = { to, resErr, resSucc };
