const asyncMiddleware = require("../utils/asyncMiddleware");
const router = require("express").Router();
const User = require("../models/User");

router.route("/")
  .post(
    asyncMiddleware(async (req, res, next) => {
      res.json(await User.create(req.body));
    })
  )
  .get(
    asyncMiddleware(async (req, res, next) => {
      res.json(await User.find());
    })
  );

router.route("/:id")
  .get(
    asyncMiddleware(async (req, res, next) => {
      res.json(await User.find({_id: req.params.id}));
    })
  )
  .put(
    asyncMiddleware(async (req, res, next) => {
      res.json(await User.updateOne({_id: req.params.id}, req.body));
    })
  )
  .delete(
    asyncMiddleware(async (req, res, next) => {
      res.json(await User.deleteOne({_id: req.params.id}));
    })
  );

module.exports = router;
