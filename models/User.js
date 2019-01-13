const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

let UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, "Please enter a username"]
		},
		password: {
			type: String,
			required: [true, "Please enter a password"]
		},
		email: {
			type: String,
			required: false
		},
		shows: [{type: Number}]
	},
	{toJSON: {virtuals: true}}
);

UserSchema.virtual("shows_list", {
	ref: "Show",
	localField: "shows",
	foreignField: "id"
});

UserSchema.pre("save", async function() {
	this.password = await bcrypt.hash(this.password, parseInt(process.env.SALT_ROUNDS));
});

UserSchema.methods.getPublicFields = function() {
	return {
		username: this.username,
		email: this.email
	};
};

UserSchema.methods.getJWT = function(refresh = false) {
	let token = jwt.sign({userId: this._id}, process.env[`${refresh ? "REFRESH_" : ""}JWT_ENCRYPTION`], {
		expiresIn: process.env[`${refresh ? "REFRESH_" : ""}JWT_EXPIRATION`]
	});
	return token;
};

UserSchema.methods.comparePassword = async function(password) {
	let match = await bcrypt.compare(password, this.password);
	return match ? null : "The password does not match";
};

module.exports = mongoose.model("User", UserSchema);
