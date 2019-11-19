const Show = require("../models/Show");
const { to, resErr, resSucc } = require("../services/response");
const thetvdbService = require("../services/TheTVDB");
const { sortBy, groupBy } = require("lodash");

const getShowInfo = async (req, res) => {
	const { id } = req.params;
	const { thetvdb } = req.query;

	let err;
	let show;

	if (thetvdb !== "true") {
		[err, show] = await to(Show.findOne({ id }));
	} else {
		[err, show] = await to(Show.findOne({ thetvdbId: id }));

		if (!err && !show) {
			let infoData;
			let postersData;

			[err, [infoData, postersData]] = await to(
				Promise.all([thetvdbService.seriesInfo(id), thetvdbService.seriesPosters(id)])
			);

			if (infoData && postersData) {
				const info = infoData.data.data;
				const posters = postersData.data.data;

				[err, show] = await to(
					Show.findOne()
						.sort({ _id: -1 })
						.select("id")
				);

				if (!err) {
					[err, show] = await to(
						Show.create({
							id: show ? show.id + 1 : 1,
							banner: thetvdbService.getImageURL(info.banner, "banner"),
							genre: info.genre,
							imdbId: info.imdbId,
							network: info.network,
							poster: thetvdbService.getImageURL(posters[0].fileName, "poster"),
							status: info.status,
							summary: info.overview,
							thetvdbId: info.id,
							thetvdbSlug: info.slug,
							title: info.seriesName,
							year: parseInt(info.firstAired.substring(0, 4))
						})
					);
				}
			}
		}
	}

	if (err) {
		return resErr(res, err);
	} else if (!show) {
		return resErr(res, "This show does not exist");
	}
	return resSucc(res, show);
};

const search = async (req, res) => {
	const { limit = 10, start = 0, title, thetvdb } = req.query;

	let err;
	let shows;

	if (thetvdb !== "true") {
		[err, shows] = await to(
			Show.find({ title: { $regex: title, $options: "i" } })
				.sort({ title: 1 })
				.select("_id id banner title status")
				.skip(parseInt(limit) * parseInt(start))
				.limit(parseInt(limit))
				.lean()
		);
	} else {
		let data;
		[err, data] = await to(thetvdbService.searchByName(title));

		if (data) {
			shows = data.data.data.map((el) => ({
				banner: thetvdbService.getImageURL(el.banner, "banner"),
				thetvdbId: el.id,
				title: el.seriesName,
				status: el.status
			}));
		}
	}

	if (err) {
		return resErr(res, err);
	}

	return resSucc(res, shows);
};

const getShowSeasons = async (req, res) => {
	const { thetvdbId } = req.params;

	const [err, data] = await to(thetvdbService.seriesSeasons(thetvdbId));

	if (err) {
		return resErr(res, err);
	}

	const episodes = data.data.data.filter((el) => el.airedSeason > 0);
	const seasonsObj = groupBy(episodes, "airedSeason");
	const numberOfSeasons = Object.keys(seasonsObj).length;

	let seasons = [];
	for (let index = 1; index <= numberOfSeasons; index++) {
		const mappedEpisodes = seasonsObj[index].map((el) => ({
			aired: el.firstAired,
			number: el.airedEpisodeNumber,
			summary: el.overview,
			title: el.episodeName
		}));
		const sortedEpisodes = sortBy(mappedEpisodes, ["episode"]);

		seasons.push({ season: index, episodes: sortedEpisodes });
	}

	return resSucc(res, seasons);
};

module.exports = { getShowInfo, search, getShowSeasons };
