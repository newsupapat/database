var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Statement = new Schema({
    _id : String,
    Date : String, 
    Code : String,
    Sub_total : Number,
    EM_id : String,
    Reason : String
});

exports.Statement = mongoose.model('Statement', Statement);
