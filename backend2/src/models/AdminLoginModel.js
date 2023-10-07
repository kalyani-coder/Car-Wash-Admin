const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
email : String,
password : String
});

const Adminlogin = mongoose.model('Adminlogin', adminSchema);

module.exports = Adminlogin;
