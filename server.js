const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/my-tv-shows-status")
	.then(() => {
		console.log("Successfully connected to the database");
	})
	.catch((err) => {
		console.log("Could not connect to the database");
		process.exit();
	});
mongoose.Promise = global.Promise;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
	// Website you wish to allow to connect
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");

	// Request methods you wish to allow
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

	// Request headers you wish to allow
	res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");

	// Set to true if you need the website to include cookies in the requests
	// sent to the API (e.g. in case you use sessions)
	res.setHeader("Access-Control-Allow-Credentials", false);

	// Pass to next layer of middleware
	next();
});

app.use("/api/shows", require("./routes/shows"));

app.use((error, req, res, next) => {
	res.status(400);
	res.json(error);
});

app.listen(3000, () => console.log("Listening on port 3000"));
