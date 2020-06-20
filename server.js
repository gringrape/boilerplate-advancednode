"use strict";
const express     = require("express");
const fccTesting  = require("./freeCodeCamp/fcctesting.js");
const session     = require("express-session");
const passport    = require("passport");
const ObjectID    = require("mongodb").ObjectID;

const app = express();
fccTesting(app); //For FCC testing purposes
process.env.SESSION_SECRET = 'nightCat';

app.set('view engine', 'pug');
app.use("/public", express.static(process.cwd() + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.route("/").get((req, res) => {
  //Change the response to render the Pug template
  res.render('pug/index', {
    title: 'Hello',
    message: 'Please login'
  });
  console.log(process.env.SESSION_SECRET);
});

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  db.collection('users').findOne(
    {_id: ObjectID(id)},
    (err, doc) => {
      done(null, doc);
    }
  )
});
 
app.listen(process.env.PORT || 3000, () => {
  console.log("Listening on port " + process.env.PORT);
});
