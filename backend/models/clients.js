const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  orderDetails: { type: String, required: true },
  pincode: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  pickUpAddress: { type: String, required: false }
});

module.exports = mongoose.model("Clients", Schema);

