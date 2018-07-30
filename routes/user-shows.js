const router = require("express").Router();
const User = require("../models/User");
const asyncMiddleware = require("../utils/asyncMiddleware");

router.route("/:id").get(
  asyncMiddleware(async (req, res, next) => {
    res.json(
      await User.findOne({_id: req.params.id})
        .select("library.shows -_id")
        .populate({path: "library.shows", model: "Show"})
    );
  })
);

router
  .route("/:id/:showID")
  .delete(
    asyncMiddleware(async (req, res, next) => {
      res.json(
        await User.updateOne(
          {_id: req.params.id},
          {$pullAll: {"library.shows": [req.params.showID]}}
        )
      );
    })
  )
  .put(
    asyncMiddleware(async (req, res, next) => {
      res.json(
        await User.updateOne({_id: req.params.id}, {$push: {"library.shows": req.params.showID}})
      );
    })
  );

module.exports = router;
