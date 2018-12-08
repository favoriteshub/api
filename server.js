const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const passport = require("passport");
const {strategy: passportStrategy} = require("./services/passport");
const cors = require("cors");
const bodyParser = require("body-parser");
const JsonRefs = require("json-refs");
const swaggerUi = require("swagger-ui-express");

dotenv.config({path: "./.env"});

mongoose.connect(process.env.DB).then(
	() => console.log("Successfully connected to the database"),
	(err) => {
		console.log(err.message);
		process.exit();
	}
);
mongoose.Promise = global.Promise;

passport.use(passportStrategy());

const app = express();

app.use(passport.initialize());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

JsonRefs.resolveRefsAt("./documentation/swagger.json").then(
	(response) => {
		app.use("/swagger", swaggerUi.serve, swaggerUi.setup(response.resolved));
	},
	(err) => {
		console.log(err.stack);
	}
);
app.use("/api/auth", require("./routes/auth"));
app.use("/api/shows", passport.authenticate("jwt", {session: false}), require("./routes/shows"));
app.use("/api/films", passport.authenticate("jwt", {session: false}), require("./routes/films"));
app.use("/api/users", passport.authenticate("jwt", {session: false}), require("./routes/users"));
app.use("/api/user-shows", passport.authenticate("jwt", {session: false}), require("./routes/user-shows"));
app.use("/api/user-films", passport.authenticate("jwt", {session: false}), require("./routes/user-films"));

app.listen(parseInt(process.env.PORT), () => console.log(`Listening on port ${process.env.PORT}`));
