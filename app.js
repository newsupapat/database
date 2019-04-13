var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const chalk = require('chalk');

var Schema_position = require('./models/position').position;
var Schema_promotional = require('./models/promotional').Promo;
var Schema_statement = require('./models/statement').Statement;
var Schema_code = require('./models/code').Code;
var Schema_daily_time = require('./models/daily_time').daily_time;
var Schema_history = require('./models/Last_history').History;
var Schema_education = require('./models/education').Education;
var Schema_actdetail = require('./models/act_detail').Act_detail;
var Schema_regis = require('./models/act_reg').regis;

//
var indexRouter = require('./routes/index');
var employeeControl = require('./routes/employee');
var positionControl = require('./routes/position');
var activityRegControl = require('./routes/activityreg');
var activityStatControl = require('./routes/activitystat');
var experienceControl = require('./routes/experience');
var statementControl = require('./routes/statement');

// Intitial
var app = express();
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Create Schema Info
var Info_Schema = new mongoose.Schema({
  _id: { type: String 
    // required: true
  },
  Name: {FullName: String,LastName: String},
  gender: String,
  DOB: String,
  Phone: String,
  Address: String,
  Nationality: String,
  Status : {
    type: String,
  },
  Marital: String,
  Idcard : {
    type: Number,
     min: [1000000000000, 'Too few Identify card'],
     max: [9999999999999, 'Too many Identify card']
  },
  s_Salary : Number
},{
  versionKey: false // You should be aware of the outcome after set to false
});
//Connect to Database *Clound
  var con = mongoose.connect('mongodb://admin:a123456@ds131676.mlab.com:31676/heroku_cxslbbhv', {useNewUrlParser: true});
  mongoose.connection
  .on('connected', () => {
  console.log(`Mongoose connection open on mLab`);
  })
  .on('error', (err) => {
  console.log(`Connection error`);
  });
  // mongoose.set('useCreateIndex', true)
  mongoose.Promise = global.Promise;
  global.position = mongoose.model('positions',Schema_position);
  global.information = mongoose.model('information',Info_Schema);
  global.promotional = mongoose.model('promotional',Schema_promotional);
  global.statement = mongoose.model('statements',Schema_statement);
  global.Code = mongoose.model('codes',Schema_code);
  global.daily = mongoose.model('daily_time',Schema_daily_time);
  global.education = mongoose.model('Education',Schema_education);
  global.lasthist = mongoose.model('Last_History',Schema_history);
  global.act_regis = mongoose.model('Activity Register',Schema_regis);
  global.act_detail = mongoose.model('Activity Detail',Schema_actdetail);
  

//Set Express
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.get('/', indexRouter.index);
//Routes-Information
app.get('/information',employeeControl.getInformation);
app.post('/information',employeeControl.postInformation);
app.post('/informationEdit',employeeControl.postInformationEdit);
//Routes-Position
app.post('/position',positionControl.postPosition);
//Statement-Code
app.get('/statement',statementControl.getStatement);
app.post('/code',statementControl.postCode);
app.post('/statement',statementControl.postStatement);

app.get('/experience',experienceControl.getInformation);
app.post('/experience',experienceControl.postExp);
app.post('/promotional',positionControl.postpromotional);

app.get('/activityrigistor',activityRegControl.getInformation);
app.post('/activityrigistor',activityRegControl.getPostActreg);

app.get('/activitystat',activityStatControl.getInformation);
app.post('/activitystat',activityStatControl.postdetail);

//Extension
app.get('/EditInfo',employeeControl.Edit);
app.get('/data',employeeControl.getData);
app.get('/count',employeeControl.getCount);
//Not Gonna Happen Page Get
app.get("*",function(req,res){
  res.redirect('err.html');
});





/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
