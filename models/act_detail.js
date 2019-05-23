var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Act_detail = new Schema(
  {
    _id: String,
    Act_name: String,
    Start_date: String,
    End_date: String,
    Header: String,
    Budget: Number,
    Co_H1: String,
    Co_H2: String,
    Co_H3: String
  },
  {
    versionKey: false
  }
);

exports.Act_detail = Act_detail;
