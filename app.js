const express = require("express");
const authRoutes = require("./routes/authRoutes");
const profile = require("./routes/profileRoute");
const passportSetup = require("./config/passPortSetUp");
const mongoose = require("mongoose");
const keys = require("./config/keys"); // keys are not available,should be added manually ,get required db,google api keys form respective platforms
const app = express();
const cookieSession = require("cookie-session");
const passport = require("passport");

app.set("view engine", "ejs");
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookie],
  })
);
app.use(passport.initialize());
app.use(passport.session());
mongoose.connect(
  keys.mongodb.dbURI,
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (err) console.log(err);
    else console.log("connected to database myDb ;)");
  }
);
app.use("/auth", authRoutes);
app.use("/profile", profile);

app.listen(3000, () => {
  console.log("app listening at port 3000");
});

app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});
