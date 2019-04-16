var express = require('express');
var router = express.Router();

Number.prototype.pad = function (size) {
	var s = String(this);
	while (s.length < (size || 2)) {
		s = "0" + s;
	}
	return s;
}
/* GET home page. */
router.getInformation = (req, res) => {
	act_detail.find({}, function (err, item) {
		console.log(item);
		// new act_detail({
		// 	_id : "A001",
		// 	Act_name : "Football",
		// 	Start_date : "11/09/19",
		// 	End_date : "12/09/19",
		// 	Header : "new",
		// 	Budget : 9999,
		// 	Co_H1 : "new",
		// 	Co_H2 : "new",
		// 	Co_H3 : "new"
		// }).save(function (err, docs) {
		// 		console.log(docs);
		// });
		res.render('Form/activity_reg', {
			title: 'ActivityReg',
			activitydata: item
		});
	});
};
router.getPostActreg = (req, res) => {
	// req.body.input_EMID
	// req.body.Activity
	// req.body.start
	console.log("Enter post act regis");
	information.findOneAndUpdate({
			_id: req.body.input_EMID
		}, {
			$set: {
				Phone: req.body.phone
			}
		}, (err, doc) => {
			console.log(doc);
			if (err) {
				res.send("Something wrong when updating data!");
			} else if (doc) {
				new act_regis({
					Act_id: req.body.Activity,
					EM_id: req.body.input_EMID,
					Date: req.body.datestart
				}).save(function (err, docs) {
					if (err) {
						res.send(err.message);
					} else {
						console.log("Save" + docs);
					}
				});
				act_detail.findOne({
					_id: req.body.Activity
				}, 'Act_name', function (err, docs) {
					new daily({
						EM_id: req.body.input_EMID,
						Start_time: req.body.datestart,
						Date: Date.now(),
						Absent: "0",
						Note: docs.Act_name
					}).save(function (err, products) {
						if (err) res.send(err.message);
						else res.send("Save");
					});
				});
			} else {
				res.send("No Data")
			}
		});
}
module.exports = router;