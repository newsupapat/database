var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Code = new Schema({
    Code : String,
    Description : String,
    Cost : Number
},{
    versionKey: false
});

exports.Code = Code;
