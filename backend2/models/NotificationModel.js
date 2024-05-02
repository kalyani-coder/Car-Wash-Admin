const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
 title : String,
 message : String,
 sendto : String
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
