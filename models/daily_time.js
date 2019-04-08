var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var daily_time = new daily_time({
    EM_id : String,
    Start_time : String,
    End_time : String,
    Date : String,
    Absent : Number,
    Note : String
});

exports.daily_time = mongoose.model('daily_time', daily_time);