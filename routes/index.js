var express = require('express');
var router = express.Router();

/* GET home page. */
router.index = (req,res) => {
  res.render('index',{
    title: 'Home'
  });
};

module.exports = router;
