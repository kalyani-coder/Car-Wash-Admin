

const mongoose = require('mongoose')

const AgentnitificationSchema = new mongoose.Schema({

    title : String,
    message : String,
    sendto :String

})

const AgentNotification = mongoose.model('/agentnotification' , AgentnitificationSchema)


module.exports = AgentNotification;