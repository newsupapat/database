var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


/* GET home page. */
router.getInformation = (req, res) => {
	res.render('Form/employee_exp', {
		title: 'Experience'
	});
};
module.exports = router;