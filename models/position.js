var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Position = new Schema({
    _id : String,
    Department:String,
    Position:String
});

exports.position = mongoose.model('position', Position);
