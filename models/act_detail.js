var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Act_detail = new Code({
    Act_id : String,
    Act_name : String,
    Start_date : //k ให้บิ้งช่วยเข้ามาทำด้วยมีธ เต็มที่ commit ก่อนเดียวหาย555
});

exports.Act_detail = mongoose.model('Act_detail', Act_detail);
//กำหนด ตัวอักษรได้นะ
//หมายความว่าไง
Idcard : {
    type: Number,
     min: [1000000000000, 'Too few Identify card'],
     max: [9999999999999, 'Too many Identify card']
  },
  //ละต้องใส่ตรงไหนอ่ะ
  //สมมุติ
  //แบบนี้คือ กำหนดว่าmin เท่าไร max เท่าไร
  //ข้างหลังคือ มันจะแจ้งกลัวถ้าผิด