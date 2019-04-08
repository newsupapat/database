var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Promo = new Schema({
    Employeeid : String,
    Start:String,
    Salary:Number,
    Position_id:String
});

exports.Promo = mongoose.model('promotion', Promo);