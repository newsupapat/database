var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Promo = new Schema({
    Employeeid : String,
    Start:{
        type: Date,
        default: Date.now
      },
    Salary:Number,
    Position_id:String
},{
    versionKey: false // You should be aware of the outcome after set to false
});

exports.Promo = Promo;