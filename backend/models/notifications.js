const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  sendto: { type: String, required: true },
});

module.exports = mongoose.model("notifications", Schema);
