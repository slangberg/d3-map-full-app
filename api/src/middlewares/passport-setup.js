const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");

// Configure Bearer Strategy for token authentication
const passportSetup = passport.use(
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

const authenticationMiddleware = (req, res, next) => {
  passport.authenticate("bearer", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = {
  passportSetup,
  authenticationMiddleware,
};
