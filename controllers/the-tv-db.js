const TheTVDB = require("../services/TheTVDB");
const {to, resErr, resSucc} = require("../services/response");
const {sortBy} = require("lodash");

async function searchByName(req, res) {
	const [err, data] = await to(TheTVDB.searchByName(req.query.name));

	if (err) {
		return resErr(res, "No shows were found");
	} else {
		let shows = data.data.data;

		return resSucc(
			res,
			shows.map((el) => ({
				banner: TheTVDB.getImageURL(el.banner, "banner"),
				id: el.id,
				status: el.status,
				title: el.seriesName
			}))
		);
	}
}

async function seriesInfo(req, res) {
	const [err, responses] = await to(
		Promise.all([
			TheTVDB.seriesInfo(req.params.id),
			TheTVDB.seriesEpisodesInfo(req.params.id),
			TheTVDB.seriesPosters(req.params.id)
		])
	);

	if (err) {
		return resErr(res, err);
	} else {
		let info = responses[0].data.data;
		let seasons = Math.max(...responses[1].data.data.airedSeasons);
		let posters = responses[2].data.data;

		return resSucc(res, {
			banner: TheTVDB.getImageURL(info.banner, "banner"),
			genre: info.genre.join(", "),
			id: info.id,
			imdb: info.imdbId,
			network: info.network,
			poster: TheTVDB.getImageURL(posters[0].fileName, "poster"),
			seasons,
			status: info.status,
			summary: info.overview,
			thetvdb: info.slug,
			title: info.seriesName
		});
	}
}

async function seriesSeason(req, res) {
	const [err, data] = await to(TheTVDB.seriesSeason(req.params.id, req.params.season));

	if (err) {
		return resErr(res, err);
	} else {
		let episodes = sortBy(
			data.data.data.map((el) => ({
				aired: el.firstAired,
				episode: el.airedEpisodeNumber,
				summary: el.overview,
				title: el.episodeName
			})),
			["episode"]
		);

		return resSucc(res, {season: parseInt(req.params.season), episodes});
	}
}

module.exports = {searchByName, seriesInfo, seriesSeason};
