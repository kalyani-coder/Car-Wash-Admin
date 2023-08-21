const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  name: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  dob: { type: String, required: true },
  profilepic: { type: String, required: false },
});

module.exports = mongoose.model("Agents", Schema);
