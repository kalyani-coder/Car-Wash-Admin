const mongoose = require('mongoose');

const JobCardSchema = new mongoose.Schema({

    clientId : String,
    JobCardId : String,
    name  : String,
    email : String,
    phone : Number,
    address : String,
    vehicle_Make : String,
    model_Year : String,
    vehicle_Number : String,
    vehicle_Treatment : String,
    jobCardDate: Date,
    vehicle_Category : String,
    vehicle_Type : String,
    wash_type  : String,
    coating : String,
    paint_protection_field  :String,
    window_films : String,
    vinly_wraps : String,
    premium_seat_cover : String,
    lamination : String,
    interiour_decor : String,



})

const newJobCardSchema = mongoose.model("jobcard" , JobCardSchema)

module.exports = newJobCardSchema;