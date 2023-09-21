

const mongoose = require('mongoose');

const homeofferSchema = new mongoose.Schema({

    offerName : String,
    offer : String,
    homeservicesName : String,
    description : String,
    totalPrice : Number,
    image : String,
    startDate : String,
    endDate : String
})

const HomeofferSchema = mongoose.model('homeoffers' , homeofferSchema)

module.exports = HomeofferSchema;