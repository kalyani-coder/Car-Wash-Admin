const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  service: { type: String, required: true },
  offerType: { type: String, required: true },
  fixedAmount: { type: String, required: true },
  percentageAmount: { type: String, required: true },
  couponCode: { type: String, required: true },
  image: { type: String, required: false },
});

module.exports = mongoose.model("Promotions", Schema);
