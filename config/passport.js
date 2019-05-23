const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
var ObjectId = require("mongoose").Types.ObjectId;

const User = require("../models/User");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

/**
 * Sign in using Email and Password.
 */
passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { msg: `Username ${email} not found.` });
      }
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false, { msg: "Invalid email or password." });
      });
    });
  })
);

/**
 * Login Required middleware.
 */
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("errors", { msg: "Login Please To access" });
  res.redirect("/");
};
exports.isAuthenticatedstaff = (req, res, next) => {
  if (req.isAuthenticated()) {
    User.findOne({ _id: new ObjectId(req.session.passport.user) }, function(
      err,
      data
    ) {
      console.log(data.Authen.toLowerCase());
      if (data.Authen.toLowerCase() == "manager") {
        return next();
      } else if (data.Authen.toLowerCase() == "staff") {
        req.flash("errors", {
          msg: "You Are not Allow to Access this Form Please contact HR"
        });
        res.redirect("/");
      } else if (data.Authen.toLowerCase() == "ceo") {
        return next();
      } else if (data.Authen.toLowerCase() === "hr") {
        return next();
      } else res.send("Error");
    });
  } else {
    req.flash("errors", { msg: "Login Please To access" });
    res.redirect("/");
  }
};

/**
 * Authorization Required middleware.
 */
exports.isAuthorized = (req, res, next) => {
  const provider = req.path.split("/").slice(-1)[0];
  const token = req.user.tokens.find(token => token.kind === provider);
  if (token) {
    next();
  } else {
    res.redirect(`/auth/${provider}`);
  }
};
