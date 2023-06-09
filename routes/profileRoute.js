const router = require("express").Router();

router.get("/", (req, res) => {
  if (!req?.user) {
    res.redirect("/");
  } else {
    res.render("profile", { user: req.user });
  }
});

module.exports = router;
