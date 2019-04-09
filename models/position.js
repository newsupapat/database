var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Position = new Schema({
    _id : String,
    Department:String,
    Position:String
},{
    versionKey: false
});
exports.position = Position;
