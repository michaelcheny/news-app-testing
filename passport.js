import passport from "passport";
const LocalStategy = require("passport-local").Strategy;

import User from "./src/models/user";

passport.use(
  new LocalStategy((username, password, done) => {
    User.findOne({ username: username }, (error, user) => {
      // db error
      if (error) return done(error);
      // no user
      if (!user) return done(null, false);
      // found user
      user.comparePassword(password, done);
    });
  })
);
