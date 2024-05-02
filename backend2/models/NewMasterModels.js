// mongoose.js
const mongoose = require('mongoose');

const newMasterSchema = new mongoose.Schema({
    wash_types: [{
        wash_type: String,
        price: Number
    }],
   
});

const vehicleTypeSchema = new mongoose.Schema({
    vehicle_types : [{

        vehicle_type: String,
        price: Number
    }]
});

const MasterModel = mongoose.model('newMasterData', newMasterSchema);
const VehicleTypeModel = mongoose.model('VehicleType', vehicleTypeSchema);

module.exports = { MasterModel, VehicleTypeModel };
