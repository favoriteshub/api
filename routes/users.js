const router = require("express").Router();
const User = require("../models/User");
const asyncMiddleware = require("../utils/asyncMiddleware");

router
  .route("/")
  .get(
    asyncMiddleware(async (req, res, next) => {
      res.json(await User.find());
    })
  )
  .post(
    asyncMiddleware(async (req, res, next) => {
      res.json(await User.create(req.body));
    })
  );

router
  .route("/:id")
  .get(
    asyncMiddleware(async (req, res, next) => {
      res.json(await User.findOne({_id: req.params.id}));
    })
  )
  .delete(
    asyncMiddleware(async (req, res, next) => {
      res.json(await User.deleteOne({_id: req.params.id}));
    })
  )
  .put(
    asyncMiddleware(async (req, res, next) => {
      res.json(await User.updateOne({_id: req.params.id}, req.body));
    })
  );

module.exports = router;
