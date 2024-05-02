

// this code for checking login logout system on web app for trial 
const mongoose = require('mongoose');

const agentLoginSchema = new mongoose.Schema({
  
  email: String,
  password : String,
  
});

const AgentLogin = mongoose.model('agentlogin', agentLoginSchema);

module.exports = AgentLogin;
