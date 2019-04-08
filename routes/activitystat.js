var express = require('express');
var router = express.Router();


/* GET home page. */
router.getInformation = (req, res) => {
	res.render('Form/activity_stat', {
		title: 'ActivityStat'
	});
};
module.exports = router;