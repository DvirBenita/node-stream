const express = require("express"),
  router = express.Router(),
  User = require("../database/Schema").User,
  shortid = require("shortid");

router.get("/stream_key", (req, res) => {
  console.log("get here !");
  User.findOne({ email: req.email }, (err, user) => {
    console.log(req.email);
    if (!err) {
      res.json({
        stream_key: user.stream_key,
      });
    }
  });
});

router.post("/stream_key", (req, res) => {
  console.log("get here!");
  console.log(req);
  User.findOneAndUpdate(
    {
      email: req.body.email,
    },
    {
      stream_key: shortid.generate(),
    },
    {
      upsert: true,
      new: true,
    },
    (err, user) => {
      if (!err) {
        res.json({
          stream_key: user.stream_key,
        });
      }
    }
  );
});

module.exports = router;
