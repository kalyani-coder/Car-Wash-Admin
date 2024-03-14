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
    wash_type_price : Number,

    coating : String,
    coating_Price : Number,

    paint_protection_field  :String,
    paint_protection_field_Price : Number,

    window_films : String,
    window_films_Price : Number,

    vinly_wraps : String,
    vinly_wraps_Price :Number,

    premium_seat_cover : String,
    premium_seat_cover_Price :Number,

    lamination : String,
    lamination_Price : Number,

    interiour_decor : String,
    interiour_decor_Price : Number,

    TotalAmount : Number,
    treatment : String,



})

const newJobCardSchema = mongoose.model("jobcard" , JobCardSchema)

module.exports = newJobCardSchema;