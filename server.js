const mongoose = require("mongoose");
const serverConfig = require("./configuration/server.json");

mongoose.connect(serverConfig.database).then(
  () => console.log("Successfully connected to the database"),
  (err) => {
    console.log(err.message);
    process.exit();
  }
);
mongoose.Promise = global.Promise;

const passport = require("passport");
const {strategy: passportStrategy} = require("./services/passport");
passport.use(passportStrategy());

const app = require("express")();
const bodyParser = require("body-parser");

app.use(passport.initialize());
app.use(require("cors")());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/shows", passport.authenticate("jwt", {session: false}), require("./routes/shows"));
app.use("/api/users", passport.authenticate("jwt", {session: false}), require("./routes/users"));
app.use("/api/user-shows", passport.authenticate("jwt", {session: false}), require("./routes/user-shows"));

app.use((error, req, res, next) => {
  res.status(400);
  res.json(error);
});

app.listen(serverConfig.port, () => console.log(`Listening on port ${serverConfig.port}`));
