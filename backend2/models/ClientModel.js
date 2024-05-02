const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  // Define client schema fields here
  // Example: name, email, phone, etc.
  filename: String,
  path: String,
  profilePic: String,
  clientName: String,
  clientEmail: String,
  // clientPhone: Number,
  clientPhone: { type: Number, unique: true },
  clientAddress: String,
  clientvehicleno: String,
  clientcarmodelno: String,
  clientpassword: String,
  // _id: mongoose.Schema.Types.ObjectId,
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;


// filename: String,
//   path: String,
//   profilePic: String,
//   fullName: String,
//   email: String,
//   clientPhone: { type: Number, unique: true },
//   address: String,
