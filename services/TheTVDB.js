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
		return login().then(
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

function login() {
	return instance({method: "post", url: "/login", data: {apikey: process.env.THETVDB_KEY}});
}

function getToken(res, err) {
	login().then(
		(response) => {
			TOKEN = response.data.token;
		},
		(error) => {
			console.log(error);
		}
	);
}

module.exports = {getToken};