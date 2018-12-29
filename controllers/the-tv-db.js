const TheTVDB = require("../services/TheTVDB");
const {to, resErr, resSucc} = require("../services/response");
const {sortBy} = require("lodash");

async function searchByName(req, res) {
	const [err, data] = await to(TheTVDB.searchByName(req.query.name));

	if (err) {
		return resErr(res, "No shows were found");
	} else {
		let shows = data.data.data.map((el) => ({
			id: el.id,
			title: el.seriesName,
			banner: TheTVDB.getImageURL(el.banner, "banner"),
			status: el.status
		}));

		return resSucc(res, shows);
	}
}

async function seriesInfo(req, res) {
	const [err, data] = await to(TheTVDB.seriesInfo(req.params.id));

	if (err) {
		return resErr(res, err);
	} else {
		let info = data.data.data;

		return resSucc(res, {
			thetvdb: info.id,
			imdb: info.imdbId,
			title: info.seriesName,
			banner: TheTVDB.getImageURL(info.banner, "banner"),
			status: info.status,
			network: info.network,
			genre: info.genre,
			summary: info.overview
		});
	}
}

async function seriesEpisodes(req, res) {
	const [err, data] = await to(TheTVDB.seriesEpisodes(req.params.id));

	if (err) {
		return resErr(res, err);
	} else {
		let episodes = sortBy(
			data.data.data.map((el) => ({
				season: el.airedSeason,
				episode: el.airedEpisodeNumber,
				title: el.episodeName,
				aired: el.firstAired,
				summary: el.overview
			})),
			["season", "episode"]
		);

		return resSucc(res, episodes);
	}
}

module.exports = {searchByName, seriesInfo, seriesEpisodes};
