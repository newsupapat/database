var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Education = new Schema({
    EM_id : String,
    Year_graduate : Number,
    University : String,
    Faculty : String,
    Department : String,
    GPAX : Number,
    Degree : String
});

exports.Education = mongoose.model('Education', Education);
