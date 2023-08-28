const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  // Define promotion schema fields here
  // Example: title, description, start date, end date, etc.
  title: String,
  description: String,
  service: String,
  offerType: String,
  fixedAmount: String,
  percentageAmount: String,
  couponCode: String
});

const Promotion = mongoose.model('Promotion', promotionSchema);

module.exports = Promotion;
