var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Statement = new Schema({
    Date : Date, 
    Code : String,
    Sub_total : Number,
    Employeeid : String,
    Reason : String
},{
    versionKey: false
});

exports.Statement = Statement;
