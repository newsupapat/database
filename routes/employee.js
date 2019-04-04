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
router.postEmployee = (req,res) => {
	res.send("You got in post "+ req.body.txtName);
};

module.exports = router;
