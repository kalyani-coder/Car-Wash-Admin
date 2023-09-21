

const mongoose = require('mongoose');

const homeofferSchema = new mongoose.Schema({

    offerName : String,
    offer : String,
    servicesName : String,
    description : String,
    totalPrice : String,
    image : String
})

const HomeofferSchema = mongoose.model('homeoffers' , homeofferSchema)

module.exports = HomeofferSchema;