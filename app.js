var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const chalk = require("chalk");
const session = require("express-session");
const passport = require("passport");
const flash = require("express-flash");
const expressValidator = require("express-validator");

// Passport Configuration
const passportConfig = require("./config/passport");

var Schema_position = require("./models/position").position;
var Schema_promotional = require("./models/promotional").Promo;
var Schema_statement = require("./models/statement").Statement;
var Schema_code = require("./models/code").Code;
var Schema_daily_time = require("./models/daily_time").daily_time;
var Schema_history = require("./models/Last_history").History;
var Schema_education = require("./models/education").Education;
var Schema_actdetail = require("./models/act_detail").Act_detail;
var Schema_regis = require("./models/act_reg").regis;

//
var indexRouter = require("./routes/index");
var employeeControl = require("./routes/employee");
var positionControl = require("./routes/position");
var activityRegControl = require("./routes/activityreg");
var activityStatControl = require("./routes/activitystat");
var experienceControl = require("./routes/experience");
var statementControl = require("./routes/statement");

// Intitial
var app = express();
app.set("port", process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "new_supapat",
    cookie: { maxAge: 1209600000 } // two weeks in milliseconds
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use(expressValidator());
app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  if (
    !req.user &&
    req.path !== "/login" &&
    req.path !== "/signup" &&
    !req.path.match(/^\/auth/) &&
    !req.path.match(/\./)
  ) {
    req.session.returnTo = req.originalUrl;
  } else if (
    req.user &&
    (req.path === "/account" || req.path.match(/^\/api/))
  ) {
    req.session.returnTo = req.originalUrl;
  }
  next();
});
//Create Schema Info
var Info_Schema = new mongoose.Schema(
  {
    _id: {
      type: String
      // required: true
    },
    Name: { FullName: String, LastName: String },
    gender: {
      type: String,
      enum: {
        values: ["M", "F", "N"],
        message: "Gender only Acept Male(M) Female(F) or None(N)"
      }
    },
    DOB: Date,
    Phone: {
      type: String,
      maxlength: [10, "Phone Number Must be 10 digit only"],
      validate: {
        validator: function(v) {
          return /\d{3}\d{3}\d{4}/.test(v);
        },
        message: "{VALUE} is not a valid phone number!"
      }
    },
    Address: String,
    Nationality: String,
    Status: {
      type: String,
      enum: {
        values: ["Work", "Leave", "Sleep"],
        message: "Status Must be Work, Leave, Sleep."
      }
    },
    Marital: String,
    Idcard: {
      type: Number,
      min: [1000000000000, "Too few Identify card"],
      max: [9999999999999, "Too many Identify card"]
    },
    s_Salary: Number
  },
  {
    versionKey: false
  }
);

//Connect to Database *Cloud
var con = mongoose.connect(
  "mongodb://admin:a123456@ds131676.mlab.com:31676/heroku_cxslbbhv",
  { useNewUrlParser: true }
);
mongoose.connection
  .on("connected", () => {
    console.log(`Mongoose connection open on mLab`);
  })
  .on("error", err => {
    console.log(`Connection error`);
  });
// mongoose.set('useCreateIndex', true)
mongoose.Promise = global.Promise;
global.position = mongoose.model("positions", Schema_position);
global.information = mongoose.model("information", Info_Schema);
global.promotional = mongoose.model("promotional", Schema_promotional);
global.statement = mongoose.model("statements", Schema_statement);
global.Code = mongoose.model("codes", Schema_code);
global.daily = mongoose.model("daily_time", Schema_daily_time);
global.education = mongoose.model("Education", Schema_education);
global.lasthist = mongoose.model("Last_History", Schema_history);
global.act_regis = mongoose.model("Activity Register", Schema_regis);
global.act_detail = mongoose.model("Activity Detail", Schema_actdetail);

//Set Express
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Routes
app.get("/", indexRouter.index);
app.get("/data/new", indexRouter.data);
app.post("/login", indexRouter.postLogin);
app.get("/signup", indexRouter.signup);
app.post("/signup", indexRouter.postsignup);
app.get("/account", passportConfig.isAuthenticated, indexRouter.getAccount);
app.get("/logout", indexRouter.logout);
//Routes-Information
app.get(
  "/information",
  passportConfig.isAuthenticatedstaff,
  employeeControl.getInformation
);
app.post("/information", employeeControl.postInformation);
app.post("/Edit", employeeControl.postInformationEdit);
//Routes-Position
app.post("/position", positionControl.postPosition);
//Statement-Code
app.get(
  "/statement",
  passportConfig.isAuthenticatedstaff,
  statementControl.getStatement
);
app.post("/code", statementControl.postCode);
app.post("/statement", statementControl.postStatement);

app.get(
  "/experience",
  passportConfig.isAuthenticatedstaff,
  experienceControl.getInformation
);
app.post("/experience", experienceControl.postExp);
app.post("/promotional", positionControl.postpromotional);

app.get("/activityrigistor", activityRegControl.getInformation);
app.post("/activityrigistor", activityRegControl.getPostActreg);

app.get(
  "/activitystat",
  passportConfig.isAuthenticatedstaff,
  activityStatControl.getInformation
);
app.post("/activitystat", activityStatControl.postdetail);

//Extension
app.get("/Edit", passportConfig.isAuthenticated, employeeControl.Edit);
app.get("/Delete", passportConfig.isAuthenticated, employeeControl.delete);
app.get("/data", employeeControl.getData);
app.get("/count", employeeControl.getCount);
//Not Gonna Happen Page Get
app.get("*", function(req, res) {
  res.redirect("err.html");
});

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
  console.log(
    "%s App is running at http://localhost:%d in %s mode",
    chalk.green("✓"),
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});

module.exports = app;
