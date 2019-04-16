var express = require('express');
var router = express.Router();

/* GET home page. */
router.index = (req, res) => {
  res.render('index', {
    title: 'Home'
  });
};
router.data = (req, res) => {

  if (req.query.Get == 'statement') {
    statement.find({}, function (err, item) {
      // console.log(item);
      res.json(item);
    });
  }else if(req.query.Get == 'time'){
    // daily.find({},null).exec(function(err,docs){
    //   console.log(docs);    
    //   res.json(docs);
    // });
    daily.find({ End_time: { $ne: null } },'Start_time End_time').exec(function(err,docs){
        console.log(docs);    
        res.json(docs);
      });
  }
};
module.exports = router;