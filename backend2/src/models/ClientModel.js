const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  // Define client schema fields here
  // Example: name, email, phone, etc.
  clientName: String,
  clientEmail: String,
  // clientPhone: Number,
  clientPhone: { type: Number, unique: true },
  clientdob: String,
  clientAddress: String,
  clientvehicleno: String,
  clientcarmodelno: String,
  clientpassword: String,
  // _id: mongoose.Schema.Types.ObjectId,
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
