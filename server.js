const mongoose = require("mongoose");
const serverConfig = require("./configuration/server.json");
const bodyParser = require("body-parser");

mongoose.connect(serverConfig.database).then(
  () => console.log("Successfully connected to the database"),
  (err) => {
    console.log(err.message);
    process.exit();
  }
);
mongoose.Promise = global.Promise;

const app = require("express")();

app.use(require("cors")());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/api/shows", require("./routes/shows"));
app.use("/api/users", require("./routes/users"));
app.use("/api/user-shows", require("./routes/user-shows"));

app.use((error, req, res, next) => {
  res.status(400);
  res.json(error);
});

app.listen(serverConfig.port, () => console.log("Listening on port 3000"));
