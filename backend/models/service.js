const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  serviceName: { type: String, required: true },
  serviceCategory: { type: String, required: true },
  servicePrice: { type: Number, required: true },
  serviceDescription: { type: String, required: true },
  serviceOffer: { type: String, required: true },
  serviceImage: { type: String, required: true },
});

module.exports = mongoose.model("Service", Schema);
