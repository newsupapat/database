var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Code = new Code({
    Code : String,
    Description : String,
    Cost : Number
});

exports.Code = mongoose.model('Code', Code);
