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
router.postPosition = (req, res) => {
	position.countDocuments('_id').exec((err, count) => {
		console.log(req.body);
		if (!err) {
			position.find({
				$and: [{
						Department: req.body.Department
					},
					{
						Position: req.body.Position.toLowerCase()
					}
				]
			}, function (err, docs) {
				if (err) {
					res.send("No data")
				} else {
					if (docs.length == 0) {
						new position({
							_id: "P" + (count + 1).pad(3),
							Department: req.body.Department,
							Position: req.body.Position.toLowerCase()
						}).save({}, function (err) {
							if (err) console.log(err.message);
							else 
						{
								console.log("Save_position")
								new promotional({
									Employeeid: req.body.input_EMID,
									Start: Date.now(),
									Salary: req.body.s_salary,
									Position_id: "P" + (count + 1).pad(3)
								}).save({}, function (err) {
									if (err) res.send(err.message);
									else res.send("Save")
								});
						}
						});

					} else {
						//Add to Promotional
						new promotional({
							Employeeid: req.body.input_EMID,
							Start: Date.now(),
							Salary: req.body.s_salary,
							Position_id: docs[0]._id
						}).save({}, function (err) {
							if (err) res.send(err.message);
							else res.send("Save")
						});
					}
				}
			})
		}
	});
};
router.postpromotional = (req, res) => {
	new promotional({
		Employeeid: req.body.input_EMID,
		Start: req.body.Start,
		Salary: req.body.Start,
		Position_id: req.body.Start
	}).save(function (err, product) {
		if (err) {
			res.send(err.message);
		} else {
			res.send("Complete");
		}
	});
};
module.exports = router;