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
    vehicle_Category : String,
    vehicle_Treatment : String,
    jobCardDate: Date,



})

const newJobCardSchema = mongoose.model("jobcard" , JobCardSchema)

module.exports = newJobCardSchema;