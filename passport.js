import "dotenv/config";
import passport from "passport";
const LocalStategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;

import User from "./src/models/user";

// extracts the jwt from the cookie
const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["access_token"];
  }
  return token;
};

// middleware used for authorization - protecting a resource
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_SECRET,
    },
    (payload, done) => {
      User.findById({ _id: payload.sub }, (error, user) => {
        if (error) return done(error, false);
        // if user found, no error, and pass user
        if (user) return done(null, user);
        return done(null, false);
      });
    }
  )
);

// middleware for auth local strat using username and password
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
