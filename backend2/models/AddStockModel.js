
const mongoose = require('mongoose')


const AddStocksSchema = new mongoose.Schema({

   addstocks : String,
   available : String

})

const NewAddStocks = mongoose.model('Addstocks' , AddStocksSchema)

module.exports = NewAddStocks;