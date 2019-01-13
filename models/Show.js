const mongoose = require("mongoose");

let ShowSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	id: {
		type: Number,
		required: true
	},
	poster: {
		type: String,
		required: true
	},
	user_id: {
		type: mongoose.Schema.ObjectId,
		required: true
	}
});

ShowSchema.methods.getPublicFields = function() {
	return {
		title: this.title,
		id: this.id,
		poster: this.poster
	};
};

module.exports = mongoose.model("Show", ShowSchema);
