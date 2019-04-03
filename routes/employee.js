var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// var books = mongoose.model('books');

/* GET home page. */
router.getEmployee = (req,res) => {
  res.render('employee',{
    title: 'Employee'
  });
  // books.find(function(err,dbBooks){
  //   res.render('test',{title:รายการหนังสือ,data:dbBooks})
  // });
};
router.postEmployee = (req,res) => {
  res.send("You got in post "+ req.body.txtName);
};

module.exports = router;
