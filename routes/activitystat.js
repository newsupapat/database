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
	res.render('Form/activity_stat', {
		title: 'ActivityStat'
	});
};
router.postdetail = (req, res) => {
	console.log(req.body);
	information.find({
		'_id': {
			$in: [
				req.body.header,
				req.body.input_co_h1,
				req.body.input_co_h2,
				req.body.input_co_h3,
			]
		}
	}, function (err, item) {
		if (item.length === 4) {
			act_detail.countDocuments('_id').exec((err, count) => {
				if (err) {
					res.send(err);
				} else {
					new act_detail({
						_id: "A" + (count + 1).pad(3),
						Act_name: req.body.Act_name,
						Start_date: req.body.Start_date,
						End_date: req.body.End_date,
						Header: req.body.header,
						Budget: req.body.budget,
						Co_H1: req.body.input_co_h1,
						Co_H2: req.body.input_co_h2,
						Co_H3: req.body.input_co_h3
					}).save(function (err, docs) {
						if (err) res.send(err.message);
						else {
							new regis({
								Act_id: "A" + (count + 1).pad(3),
								EM_id: req.body.header,
								Date: req.body.Start_date
							}, {
								Act_id: "A" + (count + 1).pad(3),
								EM_id: req.body.input_co_h1,
								Date: req.body.Start_date
							}, {
								Act_id: "A" + (count + 1).pad(3),
								EM_id: req.body.input_co_h2,
								Date: req.body.Start_date
							}, {
								Act_id: "A" + (count + 1).pad(3),
								EM_id: req.body.input_co_h3,
								Date: req.body.Start_date
							}).save(function (err, docs){
								if(err) res.send(err.message);
								else res.send("save ALL")
							});
						}
					});
				}
			});
		} else {
			res.send("Enter Duplicate Employee ID or No Information");
		}
	});
};

module.exports = router;