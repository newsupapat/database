var express = require("express");
var router = express.Router();
const User = require("../models/User");
var ObjectId = require("mongoose").Types.ObjectId;

function getinformation(query) {
  var promise = information
    .find({}, query)
    .sort({
      _id: 1
    })
    .exec();
  return promise;
}
function getstatement(query) {
  var promise = statement
    .find({}, query)
    .sort({
      _id: 1
    })
    .exec();
  return promise;
}
function getlastcompany(query) {
  var promise = lasthist
    .find({}, query)
    .sort({
      _id: 1
    })
    .exec();
  return promise;
}
function getpromotion(query) {
  var promise = promotional
    .find({}, query)
    .sort({
      _id: 1
    })
    .exec();
  return promise;
}
function getDailyTime(query) {
  var promise = daily
    .find({}, query)
    .sort({
      _id: 1
    })
    .exec();
  return promise;
}
function getCode(query) {
  var promise = Code.find({}, query)
    .sort({
      _id: 1
    })
    .exec();
  return promise;
}
function getEducation(query) {
  var promise = education
    .find({}, query)
    .sort({
      _id: 1
    })
    .exec();
  return promise;
}
function getPosition(query) {
  var promise = position
    .find({}, query)
    .sort({
      _id: 1
    })
    .exec();
  return promise;
}
function getAct_Deatil(query) {
  var promise = act_detail
    .find({}, query)
    .sort({
      _id: 1
    })
    .exec();
  return promise;
}
function manager(res) {
  getinformation("Name Status Phone s_Salary").then(data => {
    getstatement("-_id Date Reason Code").then(statement => {
      getCode("-_id Code Description").then(code => {
        getPosition("Department Position").then(position => {
          getAct_Deatil().then(detail => {
            return res.render("information_table", {
              title: "Data",
              Authen: "Manager",
              data: data.map(doc => doc.toObject()),
              statement: statement.map(doc => doc.toObject()),
              code: code.map(doc => doc.toObject()),
              position: position.map(doc => doc.toObject()),
              detail: detail.map(doc => doc.toObject()),
              education: null,
              daily: null,
              lasthist: null,
              promotion: null
            });
          });
        });
      });
    });
  });
}
function ceo(res) {
  getinformation("Name gender Status s_Salary").then(data => {
    getstatement("-_id Date Reason Code").then(statement => {
      getCode("-_id Code Description").then(code => {
        getPosition("Department Position").then(position => {
          getAct_Deatil().then(detail => {
            return res.render("information_table", {
              title: "Data",
              Authen: "CEO",
              data: data.map(doc => doc.toObject()),
              statement: statement.map(doc => doc.toObject()),
              code: code.map(doc => doc.toObject()),
              position: position.map(doc => doc.toObject()),
              detail: detail.map(doc => doc.toObject()),
              education: null,
              daily: null,
              lasthist: null,
              promotion: null
            });
          });
        });
      });
    });
  });
}
function staff(res) {
  getinformation("Name gender Phone Status s_Salary").then(data => {
    getstatement("Date Reason Code Employeeid").then(statement => {
      getCode("Code Cost Description").then(code => {
        getPosition("Department Position").then(position => {
          getAct_Deatil("").then(detail => {
            getEducation("Univarsity Faculty Department GPAX Degree").then(
              employee => {
                getDailyTime("").then(daily => {
                  return res.render("information_table", {
                    title: "Data",
                    Authen: "Staff",
                    data: data.map(doc => doc.toObject()),
                    statement: statement.map(doc => doc.toObject()),
                    code: code.map(doc => doc.toObject()),
                    position: position.map(doc => doc.toObject()),
                    detail: detail.map(doc => doc.toObject()),
                    education: employee.map(doc => doc.toObject()),
                    daily: daily.map(doc => doc.toObject()),
                    lasthist: null,
                    promotion: null
                  });
                });
              }
            );
          });
        });
      });
    });
  });
}
function Hr_Authen(res) {
  getinformation("_id Name gender Phone Status s_Salary").then(data => {
    getstatement("Date Reason Code ").then(statement => {
      getCode("Code Description").then(code => {
        getPosition("Department Position").then(position => {
          getAct_Deatil("").then(detail => {
            getEducation("Univarsity Faculty Department GPAX Degree").then(
              employee => {
                getDailyTime("-_id").then(daily => {
                  getlastcompany().then(lasthist => {
                    getpromotion().then(promotion => {
                      return res.render("information_table", {
                        title: "Data",
                        Authen: "Staff",
                        data: data.map(doc => doc.toObject()),
                        statement: statement.map(doc => doc.toObject()),
                        code: code.map(doc => doc.toObject()),
                        position: position.map(doc => doc.toObject()),
                        detail: detail.map(doc => doc.toObject()),
                        education: employee.map(doc => doc.toObject()),
                        daily: daily.map(doc => doc.toObject()),
                        lasthist: lasthist.map(doc => doc.toObject()),
                        promotion: promotion.map(doc => doc.toObject())
                      });
                    });
                  });
                });
              }
            );
          });
        });
      });
    });
  });
}

/* GET home page. */
router.getInformation = (req, res) => {
  res.render("Form/employee", {
    title: "Information"
  });
};
router.getCount = (req, res) => {
  information.countDocuments("_id").exec((err, count) => {
    if (err) {
      res.send(err);
      return;
    }
    res.json({
      count: count
    });
  });
};
//Post from Form******
router.postInformation = (req, res) => {
  // console.log(req.body.Address);
  new information({
    _id: req.body.input_EMID,
    Name: {
      FullName: req.body.input_firstname,
      LastName: req.body.input_lastname
    },
    gender: req.body.gender,
    DOB: req.body.dob,
    Phone: req.body.phone,
    Address: req.body.Address,
    Nationality: req.body.Nationality,
    Status: req.body.Status,
    Marital: req.body.Marital,
    Idcard: req.body.input_ID,
    s_Salary: req.body.s_salary
  }).save(function(err, product) {
    if (err) {
      res.send(err.message);
    } else {
      res.send("Complete");
    }
  });
};
router.postInformationEdit = (req, res) => {
  console.log(typeof req.query.q);
  console.log(req.query.q);
  console.log(req.body);
  var collection_Sel;
  switch (req.query.q) {
    case "information":
      {
        collection_Sel = information;
        req.body.Name = {
          FullName: req.body.FullName,
          LastName: req.body.LastName
        };
      }
      break;
    case "statement":
      collection_Sel = statement;
      break;
    case "code":
      collection_Sel = Code;
      break;
    case "Daily_Time":
      collection_Sel = daily;
      break;
    case "Education":
      collection_Sel = education;
      break;
    case "Last_History":
      collection_Sel = lasthist;
      break;
    case "Activity_detail":
      collection_Sel = act_detail;
      break;
    case "Promotion":
      collection_Sel = promotional;
      break;
    case "Position":
      collection_Sel = position;
      break;
  }
  collection_Sel.findOneAndUpdate(
    { _id: req.body.id },
    {
      $set: req.body
    },
    { runValidators: true },
    (err, doc) => {
      if (err) {
        console.log(err);
        req.flash("errors", { msg: err.message });
        res.redirect("back");
      } else {
        res.redirect("/data");
      }
    }
  );
};
router.getData = (req, res) => {
  if (req.isAuthenticated()) {
    User.findOne({ _id: new ObjectId(req.session.passport.user) }, function(
      err,
      data
    ) {
      console.log(data.Authen.toLowerCase());
      if (data.Authen.toLowerCase() == "manager") {
        manager(res);
      } else if (data.Authen.toLowerCase() == "staff") {
        staff(res);
      } else if (data.Authen.toLowerCase() == "ceo") {
        ceo(res);
      } else if (data.Authen.toLowerCase() === "hr") {
        Hr_Authen(res);
      } else res.send("Error");
    });
  } else {
    req.flash("errors", { msg: "Please Login To See Data" });
    res.redirect("/");
  }
};
router.Edit = (req, res) => {
  let JSObj = JSON.parse(req.query.q);
  console.log(JSObj);
  res.render("edit_info", {
    title: "Data",
    Header: req.query.coll,
    data2: JSObj
  });
};
router.delete = (req, res) => {
  var collection_Sel;
  switch (req.query.coll) {
    case "information":
      {
        collection_Sel = information;
        req.body.Name = {
          FullName: req.body.FullName,
          LastName: req.body.LastName
        };
      }
      break;
    case "statement":
      collection_Sel = statement;
      break;
    case "code":
      collection_Sel = Code;
      break;
    case "Daily_Time":
      collection_Sel = daily;
      break;
    case "Education":
      collection_Sel = education;
      break;
    case "Last_History":
      collection_Sel = lasthist;
      break;
    case "Activity_detail":
      collection_Sel = act_detail;
      break;
    case "Promotion":
      collection_Sel = promotional;
      break;
    case "Position":
      collection_Sel = position;
      break;
  }
  console.log(collection_Sel + req.query.id);
  collection_Sel.findOneAndRemove({ _id: req.query.id }, function(err) {
    if (err) {
      res.send("Error");
    } else {
      res.redirect("/data");
    }
  });
};

module.exports = router;
