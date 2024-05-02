const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
//   agentName: String,
//   agentCategory: String,
//   agentPrice: Number,
//   agentDescription: String,
//   agentOffer: String,
   agentImage: String,
});

const Agent = mongoose.model('agent', agentSchema);

module.exports = Agent;
