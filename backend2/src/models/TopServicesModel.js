
const mongoose = require('mongoose')


const topServicesSchema = new mongoose.Schema({

    title: String,
    category : String,
    price : String,
    description :String,
    offer : String,
    image : String,

})

const topServices = mongoose.model('topServices' , topServicesSchema)

module.exports = topServices;