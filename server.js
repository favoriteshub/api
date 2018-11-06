require("dotenv").config({path: "./.env"});
const mongoose = require("mongoose");

mongoose.connect(process.env.DB).then(
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
const swaggerUi = require("swagger-ui-express");
const JsonRefs = require("json-refs");

app.use(passport.initialize());
app.use(require("cors")());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

JsonRefs.resolveRefsAt("./documentation/swagger.json").then(
  (res) => {
    app.use("/swagger", swaggerUi.serve, swaggerUi.setup(res.resolved));
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
