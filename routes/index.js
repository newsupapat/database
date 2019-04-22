var express = require('express');
var router = express.Router();
const User = require('../models/User');
const passport = require('passport');

/* GET home page. */
router.index = (req, res) => {
  lasthist.find({}).exec(function (err, data) {
    console.log(data);
    res.render('index', {
      title: 'Home',
      lasthist: data
    });
  })
};
router.data = (req, res) => {

  if (req.query.Get == 'statement') {
    statement.find({}, function (err, item) {
      // console.log(item);
      res.json(item);
    });
  }else if(req.query.Get == 'time'){
    // daily.find({},null).exec(function(err,docs){
    //   console.log(docs);    
    //   res.json(docs);
    // });
    daily.find({ End_time: { $ne: null } },'Start_time End_time').exec(function(err,docs){
        // console.log(docs);    
        res.json(docs);
      });
  }else if(req.query.Get == 'ot_late'){
    // console.log(new Date(new Date().getFullYear(),new Date().getMonth()+1, 1));
    statement.find({Date:{
      $gte :  new Date(new Date().getFullYear(),new Date().getMonth()+1,-28),
      $lt: new Date(new Date().getFullYear(),new Date().getMonth()+1,31)
    },$or: [ { Code: 'OT' }, { Code: 'LATE' } ]},'Date Code Sub_total', function (err, item) {
      // console.log(item);
      res.json(item);
    });
  }else if(req.query.Get == 'salary'){
    information.find({},'_id s_Salary DOB').sort({
      _id: 1
    }).exec(function (err, data) {
      // console.log(data);
      res.json(data);
    })
  }else if(req.query.Get == 'lastcom'){
    lasthist.find({},'Nuber_of_company_worked').exec(function (err, data) {
      // console.log(data);
      res.json(data);
    })
  }else if(req.query.Get == 'marital'){
    information.find({},'Marital').exec(function (err, data) {
      // console.log(data);
      res.json(data);
    })
  }else if(req.query.Get == 'nation'){
    information.find({},'Nationality').exec(function (err, data) {
      console.log(data);
      res.json(data);
    })
  }else if(req.query.Get == 'gpax'){
    education.find({},'EM_id GPAX').exec(function (err, data) {
      // console.log(data);
      res.json(data);
    })
  }else if(req.query.Get == 'absent'){
    daily.find({Date:{
      $gte :  new Date(new Date().getFullYear(),new Date().getMonth()+1,-28),
      $lt: new Date(new Date().getFullYear(),new Date().getMonth()+1,31)
    },$and: [ { Absent: 1 } ]},'Date Absent', function (err, item) {
      // console.log(item);
      res.json(item);
    });
  }else if(req.query.Get == 'education'){
    education.find({},'EM_id Degree').exec(function (err, data) {
      // console.log(data);
      res.json(data);
    })
  }else if(req.query.Get == 'gender'){
    information.find({},'Employeeid gender').exec(function (err, data) {
      // console.log(data);
      res.json(data);
    })
  }
};
// router.login = (req, res) => {
//   if (req.user) {
//     return res.redirect('/');
//   }
//   req.flash('errors', {msg:'Login Required'});
//   res.redirect('/');
// };
router.postLogin = (req, res, next) => {
  req.assert('password', 'Password cannot be blank').notEmpty();


  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    console.log(errors);
    return res.send(errors);
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      req.flash('errors', info);
      console.log(info);
      return res.redirect('/');
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      req.flash('success', { msg: 'Success! You are logged in.' });
      res.redirect('req.session.returnTo || '/'');
    });
  })(req, res, next);
};
router.signup = (req, res) => {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('account/signup', {
    title: 'Create Account'
  });
};
router.getAccount = (req, res) => {
  res.render('account/profile', {
    title: 'Account Management'
  });
};
router.postsignup = (req, res, next) => {
  req.assert('password', 'Password must be at least 4 characters long').len(4);
  req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    console.log(errors);
    return res.redirect('/signup');
  }

  const user = new User({
    email: req.body.email,
    password: req.body.password
  });

  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) { return next(err); }
    if (existingUser) {
      console.log("Account with that email address already exists.");
      req.flash('errors', { msg: 'The email address you have entered is already associated with an account.' });
      return res.redirect('/signup');
    }
    user.save((err) => {
      if (err) { return next(err); }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    });
  });
};
router.logout = (req, res) => {
  req.logout();
  req.session.destroy((err) => {
    if (err) console.log('Error : Failed to destroy the session during logout.', err);
    req.user = null;
    res.redirect('/');
  });
};
module.exports = router;