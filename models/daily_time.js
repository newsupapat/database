var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var daily_time = new Schema({
    EM_id : String,
    Start_time : String,
    End_time : String,
    Date : Date,
    Absent : Number,
    Note : String
},{
    versionKey: false
});

exports.daily_time = daily_time;
// mongoose.model('daily_time', daily_time);