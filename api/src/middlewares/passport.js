const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");

// Configure Bearer Strategy for token authentication
passport.use(
  new BearerStrategy(async function (token, done) {
    try {
      const decoded = jwt.verify(token, "secretkey");
      const user = await User.findOne({ username: decoded.username });
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;
