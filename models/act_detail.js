var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Act_detail = new Code({
    Act_id : String,
    Act_name : String,
    Start_date : String,
});

exports.Act_detail = mongoose.model('Act_detail', Act_detail);
//------------------------------------^ ตรงนี้คือชื่อ table นะ
