const axios = require("axios");

let TOKEN = null;

const instance = axios.create({
	baseURL: `https://api.thetvdb.com`
});

instance.interceptors.request.use((config) => {
	if (TOKEN != null) {
		config.headers.Authorization = `Bearer ${TOKEN}`;
	}

	return config;
}, undefined);

instance.interceptors.response.use(undefined, (error) => {
	if (error.response && error.response.status === 401 && error.config && !error.config.__isRetryRequest) {
		return getToken().then(
			(response) => {
				TOKEN = response.data.token;

				error.config.__isRetryRequest = true;
				return instance(error.config);
			},
			() => Promise.reject(error)
		);
	}
	return Promise.reject(error);
});

function getToken() {
	return instance({method: "post", url: "/login", data: {apikey: process.env.THETVDB_KEY}});
}

const mediaURL = "https://www.thetvdb.com/banners/";

function searchByName(name) {
	return instance({method: "get", url: "/search/series", params: {name}});
}

function seriesInfo(id) {
	return instance({
		method: "get",
		url: `/series/${id}/filter`,
		params: {keys: "id,imdbId,seriesName,banner,status,network,genre,overview"}
	});
}

function seriesEpisodes(id) {
	return instance({method: "get", url: `/series/${id}/episodes`});
}

module.exports = {mediaURL, searchByName, seriesInfo, seriesEpisodes};
