const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  // Define client schema fields here
  // Example: name, email, phone, etc.
  serviceName: String,
  serviceCategory: String,
  servicePrice: Number,
  serviceDescription: String,
  serviceOffer: String,
  serviceImage: String,
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
