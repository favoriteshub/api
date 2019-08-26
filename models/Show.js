const mongoose = require("mongoose");

let ShowSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true
	},
	thetvdbId: {
		type: Number,
		required: true
	},
	imdbId: {
		type: String
	},
	title: {
		type: String,
		required: true
	},
	year: {
		type: Number
	},
	status: {
		type: String
	},
	summary: {
		type: String
	},
	network: {
		type: String
	},
	genre: {
		type: [String]
	},
	banner: {
		type: String
	}
});

module.exports = mongoose.model("Show", ShowSchema);
