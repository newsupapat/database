var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const chalk = require('chalk');
var indexRouter = require('./routes/index');
var employeeControl = require('./routes/employee');

// Intitial
var app = express();
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Create Schema Info
var Info_Schema = new mongoose.Schema({
  Employeeid: { type: String, required: true, unique: true },
  Name: [{FullName: String,LastName: String}],
  gender: String,
  DOB: String,
  Phone: Number,
  Address: String,
  Nationality: String,
  Status : String,
  Marital: String,
  Idcard : Number,
  s_Salary : Number
});
//Connect to Database *Clound
  mongoose.connect('mongodb://admin:a123456@ds131676.mlab.com:31676/heroku_cxslbbhv', {useNewUrlParser: true});
  mongoose.connection
  .on('connected', () => {
  console.log(`Mongoose connection open on mLab`);
  })
  .on('error', (err) => {
  console.log(`Connection error`);
  });
  mongoose.set('useCreateIndex', true)
  mongoose.Promise = global.Promise;
  global.information = mongoose.model('information',Info_Schema);

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
app.get('/information',employeeControl.getInformation);
app.get('/statement',employeeControl.getStatement);
app.post('/information',employeeControl.postInformation);
app.get('/data',employeeControl.getData);

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
