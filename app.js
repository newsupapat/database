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

var app = express();


app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//connect mongoDB
var Info_Schema = new mongoose.Schema({
  Employeeid: String,
  Name: [{FullName: String,LastName: String}],
  gender: String,
  DOB: Date,
  Phone: Number,
  Address: String,
  Nationality: String,
  Status : String,
  Marital: String,
  Idcard : Number,
  s_Salary : Number
});

  mongoose.connect('mongodb://localhost:27017/hrdb', {useNewUrlParser: true});
  mongoose.connection
  .on('connected', () => {
  console.log(`Mongoose connection open on mongodb://localhost:27017/myshops`);
  })
  .on('error', (err) => {
  console.log(`Connection error`);
  });
  mongoose.Promise = global.Promise;
  global.information = mongoose.model('information',Info_Schema);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', indexRouter.index);
app.get('/employee',employeeControl.getEmployee);
app.post('/employee',employeeControl.postEmployee)





/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
