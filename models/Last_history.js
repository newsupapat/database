var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var History = new Schema({
    EM_id : String,
    Company : String,
    Nuber_of_company_worked : Number,
    Position : String,
    Year_resign : Number
},{
    versionKey: false
});

exports.History = History;
