const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  serviceName: String,
  serviceCategory: String,
  servicePrice: Number,
  serviceDescription: String,
  serviceOffer: String,
  serviceImage: String,
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
