const passport = require("passport");
const {Strategy: JwtStrategy, ExtractJwt: JwtExtract} = require("passport-jwt");
const User = require("../models/User");

function strategy() {
	let opts = {jwtFromRequest: JwtExtract.fromAuthHeaderAsBearerToken(), secretOrKey: process.env.JWT_ENCRYPTION};

	return new JwtStrategy(opts, function(jwt_payload, done) {
		User.findById(jwt_payload.userId, function(err, user) {
			if (err) {
				return done(err, false);
			} else if (user) {
				return done(null, user);
			}
			return done(null, false);
		});
	});
}

passport.use(strategy());

module.exports = passport;
