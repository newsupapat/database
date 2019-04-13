var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


router.getStatement = (req, res) => {
	res.render('Form/statement', {
		title: 'Statement'
	});
};
router.postCode = (req, res) => {
	Code.find({
		Code: req.body.Code
	}, function (err, docs) {
		if (err) res.send(err);
		else res.send(docs);
	});
};
router.postStatement = (req, res) => {
	information.findOne({
		'_id': req.body.input_EMID
	}, function (err, item) {
		if (item) {
			Code.find({
				Code: req.body.Code
			}, function (err, docs) {
				if (err) res.send(err.message);
				else {
					// console.log(docs);
					// res.send(docs);
					//ไม่มี code อยู๋่ก่อนก็สร้างใหม่
					if (docs.length == 0) {
						new Code({
							Code: req.body.Code,
							Description: req.body.desscription,
							Cost: req.body.Cost
						}).save(function (err, products) {
							if (err) console.log(err.message);
							else console.log("Save" + products);
						});
						new statement({
							Date: Date.now(),
							Code: req.body.Code,
							Sub_total: item.s_Salary + req.body.Cost,
							Employeeid: req.body.input_EMID,
							Reason: req.body.desscription
						}).save(function (err, products) {
							if (err) res.send(err.message);
							else console.log("Save" + products);
						});
						//มี code อยู่ก่อนเลยดึงมาใช้เลย
					} else {
						// res.send(docs);
						new statement({
							Date: Date.now(),
							Code: docs[0].Code,
							Sub_total: docs[0].Cost,
							Employeeid: req.body.input_EMID,
							Reason: docs[0].Description
						}).save(function (err, products) {
							if (err) res.send(err.message);
							else console.log("Save" + products);;
						});
					}
					//daily time
					new daily({
						EM_id: req.body.input_EMID,
						Start_time: req.body.start,
						End_time: req.body.end,
						Date: Date.now(),
						Absent: req.body.Absent,
						Note: (req.body.Note == 0) ? req.body.desscription : req.body.Note
					}).save(function (err, products) {
						if (err) res.send(err.message);
						else res.send("Save");
					});
				}
			})
		} else {
			console.log(item);
			res.send("Data Not Found")
		}

	});
};

module.exports = router;