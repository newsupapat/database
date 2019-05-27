var express = require("express");
var router = express.Router();

/* GET home page. */
router.getInformation = (req, res) => {
  res.render("Form/employee_exp", {
    title: "Experience"
  });
};
router.postExp = (req, res) => {
  information.findOne(
    {
      _id: req.body.input_EMID
    },
    function(err, item) {
      if (item) {
        console.log(item);
        new education({
          EM_id: req.body.input_EMID,
          Year_graduate: req.body.year,
          University: req.body.University,
          Faculty: req.body.Faculty,
          Department: req.body.Field,
          GPAX: req.body.gpax,
          Degree: req.body.degree
        }).save(function(err, docs) {
          if (err) res.send(err.message);
          else {
            console.log(docs);
            new lasthist({
              EM_id: req.body.input_EMID,
              Company: req.body.Company_name,
              Nuber_of_company_worked: req.body.number_com_work,
              Position: req.body.position,
              Year_resign: req.body.year_resign
            }).save(function(err, docs) {
              if (err) res.send(err.message);
              else res.send("Save");
            });
          }
        });
      } else res.send("Employee ID Not Found");
    }
  );
};
module.exports = router;
