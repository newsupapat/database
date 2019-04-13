var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


/* GET home page. */
router.getInformation = (req, res) => {
	res.render('Form/employee', {
		title: 'Information'
	});
};
router.getCount = (req, res) => {
	information.countDocuments('_id').exec((err, count) => {
		if (err) {
			res.send(err);
			return;
		}
		res.json({
			count: count
		});
	});
}
//Post from Form******
router.postInformation = (req, res) => {
	// console.log(req.body.Address);	
	new information({
		_id: req.body.input_EMID,
		Name: {
			FullName: req.body.input_firstname,
			LastName: req.body.input_lastname
		},
		gender: req.body.gender,
		DOB: req.body.dob,
		Phone: req.body.phone,
		Address: req.body.Address,
		Nationality: req.body.Nationality,
		Status: req.body.Status,
		Marital: req.body.Marital,
		Idcard: req.body.input_ID,
		s_Salary: req.body.s_salary
	}).save(function (err, product) {
		if (err) {
			res.send(err.message);
		} else {
			res.send("Complete");
		}
	});
};
router.postInformationEdit = (req, res) => {
	// res.send(req.body.input_EMID + req.body.gender);
	 information.findOneAndUpdate({_id: req.body.input_EMID}, {
		 $set:{
			Name: {
				FullName: req.body.input_firstname,
				LastName: req.body.input_lastname
			},
			gender: req.body.gender,
			DOB: req.body.dob,
			Phone: req.body.phone,
			Address: req.body.Address,
			Nationality: req.body.Nationality,
			Status: "Work",
			Marital: req.body.Marital,
			Idcard: req.body.input_ID,
			s_Salary: req.body.s_salary
		 }
		},(err, doc) => {
		if (err) {
			res.send("Something wrong when updating data!");
		}else {
			res.redirect("/data");
		}
	});
};
router.getData = (req, res) => {
	information.find({}).sort({
		_id: 1
	}).exec(function (err, data) {
		res.render('information_table', {
			title: 'Data',
			data: data
		})
	});
};
router.Edit = (req, res) => {
	information.findOne({
		_id: req.query.q
	}, function (err, data) {
		res.render('edit_info', {
			title: 'Data',
			data2: data
		});
	});
};


module.exports = router;