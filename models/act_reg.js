var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Code = new Code({
    Act_id : String,
    EM_id : String,
    Date : String
});

exports.Code = mongoose.model('Code', Code);
