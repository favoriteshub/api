const TheTVDB = require("../services/TheTVDB");
const {to, resErr, resSucc} = require("../services/response");

const searchByName = async (req, res) => {
	const [err, data] = await to(TheTVDB.searchByName(req.query.name));

	if (err) {
		return resErr(res, "No shows were found");
	} else {
		let shows = data.data.data.map((el) => {
			return {id: el.id, title: el.seriesName, banner: TheTVDB.mediaURL + el.banner, status: el.status};
		});

		return resSucc(res, shows);
	}
};

module.exports = {searchByName};
