var express = require('express');
var router = express.Router();

/* GET home page. */
router.index = (req, res) => {
  res.render('index', {
    title: 'Home'
  });
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
        console.log(docs);    
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
    information.find({},'_id s_Salary').sort({
      _id: 1
    }).exec(function (err, data) {
      console.log(data);
      res.json(data);
    })
  }else if(req.query.Get == 'lastcom'){
    lasthist.find({},'Nuber_of_company_worked').exec(function (err, data) {
      console.log(data);
      res.json(data);
    })
  }else if(req.query.Get == 'marital'){
    information.find({},'Marital').exec(function (err, data) {
      console.log(data);
      res.json(data);
    })
  }else if(req.query.Get == 'nation'){
    information.find({},'Nationality').exec(function (err, data) {
      console.log(data);
      res.json(data);
    })
  }else if(req.query.Get == 'gpax'){
    education.find({},'EM_id GPAX').exec(function (err, data) {
      console.log(data);
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
      console.log(data);
      res.json(data);
    })
  }else if(req.query.Get == 'gender'){
    information.find({},'Employeeid gender').exec(function (err, data) {
      console.log(data);
      res.json(data);
    })
  }
};
module.exports = router;