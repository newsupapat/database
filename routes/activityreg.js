var express = require('express');
var router = express.Router();


/* GET home page. */
router.getInformation = (req, res) => {
	res.render('Form/activity_reg', {
		title: 'ActivityReg'
	});
};
module.exports = router;