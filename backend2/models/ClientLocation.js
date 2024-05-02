const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  clientID: String,
  location: {
    longitude: String,
    latitude: String,
  },
  lastSeen: String,
});

const ClientLocation = mongoose.model("ClientLocation", locationSchema);

module.exports = ClientLocation;
