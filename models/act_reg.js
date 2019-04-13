var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var regis = new Schema({
    Act_id : String,
    EM_id : String,
    Date : String
},{
    versionKey: false
});

exports.regis = regis;
