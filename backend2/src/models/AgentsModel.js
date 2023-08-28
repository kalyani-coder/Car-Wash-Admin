const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  mobileNumber: Number,
  dateOfBirth: String,
  address: String,
  profilePic: String,
});

const newAgents = mongoose.model('Agents1', agentSchema);

module.exports = newAgents;
