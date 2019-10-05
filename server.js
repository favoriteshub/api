require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const passport = require("./services/passport");
const cors = require("cors");
const bodyParser = require("body-parser");

mongoose.connect(process.env.DB).then(
	() => console.log("Successfully connected to the database"),
	(err) => {
		console.log(err.message);
		process.exit();
	}
);
mongoose.Promise = global.Promise;

const app = express();

app.use(passport.initialize());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));
app.use("/api/shows", require("./routes/shows"));
app.use("/", require("./routes/docs"));

app.listen(parseInt(process.env.PORT), () => console.log(`Listening on port ${process.env.PORT}`));
