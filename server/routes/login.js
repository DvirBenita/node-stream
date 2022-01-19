const express = require("express"),
  router = express.Router(),
  User = require("../database/Schema").User,
  passport = require("passport");

router.get(
  "/",
  require("connect-ensure-login").ensureLoggedOut(),
  (req, res) => {
    res.render("login", {
      user: null,
      errors: {
        email: req.flash("email"),
        password: req.flash("password"),
      },
    });
  }
);

router.post("/", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    console.log("its work?");

    if (err)
      res.json({
        answer: "error",
      });

    if (!user)
      res.json({
        answer: "Email doesn't exist.",
      });
    if (!user.validPassword(req.body.password))
      res.json({
        answer: "invalid password!",
      });
    res.json({
      user: user,
    });
  });
});

module.exports = router;
