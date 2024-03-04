const mongoose = require('mongoose');

const carDetailSchema = new mongoose.Schema({
    vehicle_Type: { type: String },
    price : Number,
});

const carwashtypeSchema = new mongoose.Schema({
    wash_type : { type: String },
});

const carcoatingtypeSchema = new mongoose.Schema({
    coating_type : { type: String },
});

const carpaintprotectiontypeSchema = new mongoose.Schema({
    paintProtection_Type : { type: String },
});

const carWindowFilmstypeSchema = new mongoose.Schema({
    windowFilm_Type : { type: String },
});

const carVinylWrapstypeSchema = new mongoose.Schema({
    VinylWraps_Type : { type: String },
});

const carPremiumSeattypeSchema = new mongoose.Schema({
    premiumSeat_Type : { type: String },
});


const carLaminationtypeSchema = new mongoose.Schema({
    lamination_Type : { type: String },
});

const carInteriortypeSchema = new mongoose.Schema({
    interiour_Type : { type: String },
});

const CarDetailModel = mongoose.model('CarDetail', carDetailSchema);
const CarWashTypeModel = mongoose.model('CarWashType', carwashtypeSchema);
const CarCoatingTypeModel = mongoose.model('CarWashCoating', carcoatingtypeSchema);
const CarpaintprotectionTypeModel = mongoose.model('CarWashpaintprotection', carpaintprotectiontypeSchema);
const CarWindowFilmsTypeModel = mongoose.model('CarWashWindowFilms', carWindowFilmstypeSchema);
const CarVinylWrapsTypeModel = mongoose.model('CarVinylWraps', carVinylWrapstypeSchema);
const CarPremiumSeatTypeModel = mongoose.model('CarPremiumSeat', carPremiumSeattypeSchema);
const CarLaminationTypeModel = mongoose.model('CarLamination', carLaminationtypeSchema);
const CarInteriorTypeModel = mongoose.model('CarInterior', carInteriortypeSchema);

module.exports = {
    CarDetailModel,
    CarWashTypeModel,
    CarCoatingTypeModel,
    CarpaintprotectionTypeModel,
    CarWindowFilmsTypeModel,
    CarVinylWrapsTypeModel,
    CarPremiumSeatTypeModel,
    CarInteriorTypeModel,
    CarLaminationTypeModel,

};
