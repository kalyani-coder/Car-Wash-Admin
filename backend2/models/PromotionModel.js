const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
 
  title: String,
  description: String,
  promotionPrice :Number,
  image:String,
  filename: String,
  path: String,
  service : String,
  couponCode : String,
 
});

const Promotion = mongoose.model('Promotion', promotionSchema);

module.exports = Promotion;
