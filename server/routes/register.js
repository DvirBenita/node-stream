const express = require("express"),
  router = express.Router(),
  User = require("../database/Schema").User,
  shortid = require("shortid"),
  passport = require("passport");

router.get(
  "/",
  require("connect-ensure-login").ensureLoggedOut(),
  (req, res) => {
    res.render("register", {
      user: null,
      errors: {
        username: req.flash("username"),
        email: req.flash("email"),
      },
    });
  }
);

router.post("/", (req, res) => {
  console.log("dvir!!!!!!!");
  console.log(req.body.email);
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err)
      res.json({
        asnwer: "err",
      });
    console.log(user);
    if (user) {
      if (user.email === req.body.email) {
        res.json({
          asnwer: "Email is already taken",
        });
      }

      res.json({
        asnwer: "false",
      });
    } else {
      let user = new User();
      user.email = req.body.email;
      user.password = user.generateHash(req.body.password);
      user.username = req.body.username;
      user.stream_key = shortid.generate();
      user.save((err) => {
        if (err) throw err;
        res.json({
          user: user,
        });
      });
    }
  });
});

module.exports = router;
