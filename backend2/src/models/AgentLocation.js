const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  AgentID: String,
  location: {
    longitude: String,
    latitude: String,
  },
  lastSeen: String,
});

const AgentLocation = mongoose.model("AgentLocation", locationSchema);

module.exports = AgentLocation;
