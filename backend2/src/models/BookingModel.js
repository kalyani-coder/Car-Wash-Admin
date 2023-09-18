
const mongoose = require('mongoose')


const bookingSchema = new mongoose.Schema({

    clientId: String,
    clientName: String,
    servicesName: String,
    date: String,
    time: String,
    totalPrice: Number,
    pickupAddress: String,
    status: String,
    pickuptoagent: String,
    selfdrive: String,
    clientvehicleno: String,
    clientcarmodelno: String,
    agentId: String,
    agentEmail: String


})

const Booking = mongoose.model("booking", bookingSchema)

module.exports = Booking