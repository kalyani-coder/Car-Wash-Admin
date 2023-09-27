const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({

    message : String,
    clientId : String,
}) 

const  newReviewSchema = mongoose.model('reviews' , reviewSchema);

module.exports = newReviewSchema;