var express = require('express');
var router = express.Router();
var promotional = require('../models/promotional').Promo;
var position = require('../models/position').position;

/* GET home page. */
router.postPosition = (req,res) => {
	// position.findOne(
	// 	{
	// 	  $and: [
	// 			 {  : /^G/ },
	// 			 { :  }
	// 		   ]
	// 	}
	//  )
    new position({
		_id : "P"+position.find().Count()+1,
        Department:req.body.Department,
        Position:req.body.Position
	}).save(function (err, product) {
		if (err) {
			res.send(err.message);
		} else {
			res.send("Complete");
		}
	});
};
router.postpromotional = (req,res) => {
    new promotional({
		Employeeid : req.body.input_EMID,
		Start:req.body.Start,
		Salary:req.body.Start,
		Position_id:req.body.Start
	}).save(function (err, product) {
		if (err) {
			res.send(err.message);
		} else {
			res.send("Complete");
		}
	});
};
module.exports = router;
