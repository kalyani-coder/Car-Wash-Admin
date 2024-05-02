const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  filename: String,
  path: String,
  serviceImage: String,
  serviceName: String,               
  serviceDescription: String,
  serviceOffer: String,
  servicePrice: Number,
  serviceCategory: String 
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
