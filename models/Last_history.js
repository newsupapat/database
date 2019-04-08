var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Company = new Schema({
    EM_id : String,
    Company : String,
    Nuber_of_company_worked : Number,
    Position : String,
    Year_resign : Number
});

exports.Company = mongoose.model('Company', Company);
