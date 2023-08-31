

const mongoose = require('mongoose')

const assignOrderSchema = new mongoose.Schema({

    clientId: String,
    clientName: String,
    servicesName: String,
    date: String,
    time: String,
    totalPric : Number,
    pickupAddress: String,
    status: String,
    agentId: String,
})

const newAssignOrder = mongoose.model("assignorder" ,assignOrderSchema )

module.exports = newAssignOrder