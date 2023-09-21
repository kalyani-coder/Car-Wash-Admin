
const mongoose = require('mongoose')


const topServicesSchema = new mongoose.Schema({

    title: String,
    category : String,
    price : Number,
    description :String,
    offer : String,
    image : String,

})

const topServices = mongoose.model('topServices' , topServicesSchema)

module.exports = topServices;