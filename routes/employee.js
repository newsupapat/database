var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


/* GET home page. */
router.getInformation = (req,res) => {
	res.render('employee',{
	  title: 'Information'
	});
};
router.getStatement = (req,res) => {
	res.render('statement',{
	  title: 'Statement'
	});
};
//Post from Form******
router.postInformation = (req,res) => {
	new information({
	Employeeid: req.body.input_EMID,
  Name: [{FullName: req.body.input_firstname,LastName: req.body.input_lastname}],
  gender: req.body.gender,
  DOB: req.body.dob,
  Phone: req.body.phone,
  Address: req.body.address,
  Nationality: req.body.Nationality,
  Status : "Yes",
  Marital: req.body.Marital,
  Idcard : req.body.input_ID,
  s_Salary : req.body.s_salary
	}).save(function(err,product){
		if(err.code===11000){
			 res.send("Duplicate Employee Id");
		}else{
			res.send("Complete");
		}
	});
};
router.getData = (req,res) => {
	information.find(function(err,data){
		res.render('information_table',{title:'Data',data:data})
	});
};

module.exports = router;
