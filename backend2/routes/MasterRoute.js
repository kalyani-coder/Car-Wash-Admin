const express = require('express');
const router = express.Router();

const { CarDetailModel, CarWashTypeModel ,CarCoatingTypeModel,CarpaintprotectionTypeModel,CarWindowFilmsTypeModel,CarVinylWrapsTypeModel,CarPremiumSeatTypeModel,CarLaminationTypeModel,CarInteriorTypeModel} = require('../models/MasterSchema');

// all routes for CarDetailModel 

router.get("/mainmaster", async (req, res) => {
  try {
      // Fetch data from all models
      const carDetails = await CarDetailModel.find();
      const carWashTypes = await CarWashTypeModel.find();
      const carCoatingTypes = await CarCoatingTypeModel.find();
      const carPaintProtectionTypes = await CarpaintprotectionTypeModel.find();
      const carWindowFilmsTypes = await CarWindowFilmsTypeModel.find();
      const carVinylWrapsTypes = await CarVinylWrapsTypeModel.find();
      const carPremiumSeatTypes = await CarPremiumSeatTypeModel.find();
      const carLaminationTypes = await CarLaminationTypeModel.find();
      const carInteriorTypes = await CarInteriorTypeModel.find();

      // Construct the response object
      const responseData = {
          carDetails,
          carWashTypes,
          carCoatingTypes,
          carPaintProtectionTypes,
          carWindowFilmsTypes,
          carVinylWrapsTypes,
          carPremiumSeatTypes,
          carLaminationTypes,
          carInteriorTypes
      };

      // Send the response
      res.status(200).json(responseData);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
});



// vehicle types all here 
router.get("/vehicletype", async (req, res) => {

    try{
        const masterData = await CarDetailModel.find()
        res.send(masterData)
    }catch(e){
        res.status(404).send({message : `Data not found${e}`})
    }

})


router.post("/cars/vehicletype", async (req, res) => {
  try {
    const existingVehicleType =  await CarDetailModel.findOne({vehicle_Type : req.body.vehicle_Type});
    if(existingVehicleType){
      return res.status(409).send({message : "Vehicle Type Alredy Exist"})
    }
    const newService = new CarDetailModel(req.body);
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.patch("/vehicletype/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    // Find the document by ID and update it with the new data
    const updatedService = await CarDetailModel.findByIdAndUpdate(id, updatedData, { new: true });

    // Check if the document was found and updated successfully
    if (!updatedService) {
      return res.status(404).json({ message: "Vehicle type not found" });
    }

    res.status(200).json(updatedService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



  router.delete("/vehicletype/:id", async (req, res) => {
    const masterId = req.params.id;
    try {
      const deletedService = await CarDetailModel.findByIdAndRemove(masterId);
      res.json(deletedService);
    } catch (error) {
      res.status(404).json({ message: "master not found" });
    }
  });


  // Wash type all routes 

  router.get("/washtype", async (req, res) => {

    try{
        const masterData = await CarWashTypeModel.find()
        res.send(masterData)
    }catch(e){
        res.status(404).send({message : `Data not found${e}`})
    }

})


router.post("/cars/washtype", async (req, res) => {
  try {
    const existingWashType = await CarWashTypeModel.findOne({ wash_type: req.body.wash_type });
    if (existingWashType) {
      return res.status(409).send({ message: "Wash Type Already Exists" });
    }
    const newService = new CarWashTypeModel(req.body);
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.patch("/washtype/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    // Find the document by ID and update it with the new data
    const updatedService = await CarWashTypeModel.findByIdAndUpdate(id, updatedData, { new: true });

    // Check if the document was found and updated successfully
    if (!updatedService) {
      return res.status(404).json({ message: "washtype not found" });
    }

    res.status(200).json(updatedService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/washtype/:id", async (req, res) => {
  const masterId = req.params.id;
  try {
    const deletedService = await CarWashTypeModel.findByIdAndRemove(masterId);
    res.json(deletedService);
  } catch (error) {
    res.status(404).json({ message: "master not found" });
  }
});


  // coating all routes 

  router.get("/coating", async (req, res) => {

    try{
        const masterData = await CarCoatingTypeModel.find()
        res.send(masterData)
    }catch(e){
        res.status(404).send({message : `Data not found${e}`})
    }

})

router.post("/cars/coating", async (req, res) => {
  try {
    // Check if the coating type already exists
    const existingCoating = await CarCoatingTypeModel.findOne({ coating_type: req.body.coating_type });
    if (existingCoating) {
      return res.status(409).json({ message: "Coating type already exists" });
    }

    // If coating type does not exist, save it to the database
    const newCoating = new CarCoatingTypeModel(req.body);
    await newCoating.save();
    res.status(201).json(newCoating);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.patch("/coating/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    // Find the document by ID and update it with the new data
    const updatedService = await CarCoatingTypeModel.findByIdAndUpdate(id, updatedData, { new: true });

    // Check if the document was found and updated successfully
    if (!updatedService) {
      return res.status(404).json({ message: "Vehicle type not found" });
    }

    res.status(200).json(updatedService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/coating/:id", async (req, res) => {
  const masterId = req.params.id;
  try {
    const deletedService = await CarCoatingTypeModel.findByIdAndRemove(masterId);
    res.json(deletedService);
  } catch (error) {
    res.status(404).json({ message: "master not found" });
  }
});



  // paintprotection all routes 

  router.get("/paintprotection", async (req, res) => {
    
    try{
        const masterData = await CarpaintprotectionTypeModel.find()
        res.send(masterData)
    }catch(e){
        res.status(404).send({message : `Data not found${e}`})
    }

})

router.post("/cars/paintprotection", async (req, res) => {
  try {
    // Check if the paint protection type already exists
    const existingPaintProtection = await CarpaintprotectionTypeModel.findOne({ paintProtection_Type: req.body.paintProtection_Type });
    if (existingPaintProtection) {
      return res.status(409).json({ message: "Paint protection type already exists" });
    }

    // If paint protection type does not exist, save it to the database
    const newPaintProtection = new CarpaintprotectionTypeModel(req.body);
    await newPaintProtection.save();
    res.status(201).json(newPaintProtection);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.patch("/paintprotection/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    // Find the document by ID and update it with the new data
    const updatedService = await CarpaintprotectionTypeModel.findByIdAndUpdate(id, updatedData, { new: true });

    // Check if the document was found and updated successfully
    if (!updatedService) {
      return res.status(404).json({ message: "Vehicle type not found" });
    }

    res.status(200).json(updatedService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.delete("/paintprotection/:id", async (req, res) => {
  const masterId = req.params.id;
  try {
    const deletedService = await CarpaintprotectionTypeModel.findByIdAndRemove(masterId);
    res.json(deletedService);
  } catch (error) {
    res.status(404).json({ message: "master not found" });
  }
});



  // window films all routes 

  router.get("/windowfilm", async (req, res) => {

    try{
        const masterData = await CarWindowFilmsTypeModel.find()
        res.send(masterData)
    }catch(e){
        res.status(404).send({message : `Data not found${e}`})
    }

})

router.post("/cars/windowfilm", async (req, res) => {
  try {
    // Check if the window film type already exists
    const existingWindowFilm = await CarWindowFilmsTypeModel.findOne({ windowFilm_Type: req.body.windowFilm_Type });
    if (existingWindowFilm) {
      return res.status(409).json({ message: "Window film type already exists" });
    }

    // If window film type does not exist, save it to the database
    const newWindowFilm = new CarWindowFilmsTypeModel(req.body);
    await newWindowFilm.save();
    res.status(201).json(newWindowFilm);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.patch("/windowfilm/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    // Find the document by ID and update it with the new data
    const updatedService = await CarWindowFilmsTypeModel.findByIdAndUpdate(id, updatedData, { new: true });

    // Check if the document was found and updated successfully
    if (!updatedService) {
      return res.status(404).json({ message: "Vehicle type not found" });
    }

    res.status(200).json(updatedService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.delete("/windowfilm/:id", async (req, res) => {
  const masterId = req.params.id;
  try {
    const deletedService = await CarWindowFilmsTypeModel.findByIdAndRemove(masterId);
    res.json(deletedService);
  } catch (error) {
    res.status(404).json({ message: "master not found" });
  }
});



  // VinylWraps all routes 

  router.get("/vinalwraps", async (req, res) => {

    try{
        const masterData = await CarVinylWrapsTypeModel.find()
        res.send(masterData)
    }catch(e){
        res.status(404).send({message : `Data not found${e}`})
    }

})

router.post("/cars/vinalwraps", async (req, res) => {
  try {
    // Check if the vinyl wraps type already exists
    const existingVinylWraps = await CarVinylWrapsTypeModel.findOne({ VinylWraps_Type: req.body.VinylWraps_Type });
    if (existingVinylWraps) {
      return res.status(409).json({ message: "Vinyl wraps type already exists" });
    }

    // If vinyl wraps type does not exist, save it to the database
    const newVinylWraps = new CarVinylWrapsTypeModel(req.body);
    await newVinylWraps.save();
    res.status(201).json(newVinylWraps);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.patch("/vinalwraps/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    // Find the document by ID and update it with the new data
    const updatedService = await CarVinylWrapsTypeModel.findByIdAndUpdate(id, updatedData, { new: true });

    // Check if the document was found and updated successfully
    if (!updatedService) {
      return res.status(404).json({ message: "Vehicle type not found" });
    }

    res.status(200).json(updatedService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/vinalwraps/:id", async (req, res) => {
  const masterId = req.params.id;
  try {
    const deletedService = await CarVinylWrapsTypeModel.findByIdAndRemove(masterId);
    res.json(deletedService);
  } catch (error) {
    res.status(404).json({ message: "master not found" });
  }
});


// PrimiumSeat all routes 

router.get("/premiumseat", async (req, res) => {

  try{
      const masterData = await CarPremiumSeatTypeModel.find()
      res.send(masterData)
  }catch(e){
      res.status(404).send({message : `Data not found${e}`})
  }

})

router.post("/cars/premiumseat", async (req, res) => {
  try {
    // Check if the premium leather seat type already exists
    const existingPremiumSeat = await CarPremiumSeatTypeModel.findOne({ premiumSeat_Type: req.body.premiumSeat_Type });
    if (existingPremiumSeat) {
      return res.status(409).json({ message: "Premium leather seat type already exists" });
    }

    // If premium leather seat type does not exist, save it to the database
    const newPremiumSeat = new CarPremiumSeatTypeModel(req.body);
    await newPremiumSeat.save();
    res.status(201).json(newPremiumSeat);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.patch("/premiumseat/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    // Find the document by ID and update it with the new data
    const updatedService = await CarPremiumSeatTypeModel.findByIdAndUpdate(id, updatedData, { new: true });

    // Check if the document was found and updated successfully
    if (!updatedService) {
      return res.status(404).json({ message: "Vehicle type not found" });
    }

    res.status(200).json(updatedService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/premiumseat/:id", async (req, res) => {
const masterId = req.params.id;
try {
  const deletedService = await CarPremiumSeatTypeModel.findByIdAndRemove(masterId);
  res.json(deletedService);
} catch (error) {
  res.status(404).json({ message: "master not found" });
}
});

// CarInterior all routes 

router.get("/interior", async (req, res) => {

  try{
      const masterData = await CarInteriorTypeModel.find()
      res.send(masterData)
  }catch(e){
      res.status(404).send({message : `Data not found${e}`})
  }

})

router.post("/cars/interior", async (req, res) => {
  try {
    // Check if the interior type already exists
    const existingInterior = await CarInteriorTypeModel.findOne({ interiour_Type: req.body.interiour_Type });
    if (existingInterior) {
      return res.status(409).json({ message: "Interior décor type already exists" });
    }

    // If interior type does not exist, save it to the database
    const newInterior = new CarInteriorTypeModel(req.body);
    await newInterior.save();
    res.status(201).json(newInterior);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.patch("/interior/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    // Find the document by ID and update it with the new data
    const updatedService = await CarInteriorTypeModel.findByIdAndUpdate(id, updatedData, { new: true });

    // Check if the document was found and updated successfully
    if (!updatedService) {
      return res.status(404).json({ message: "Vehicle type not found" });
    }

    res.status(200).json(updatedService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/interior/:id", async (req, res) => {
const masterId = req.params.id;
try {
  const deletedService = await CarInteriorTypeModel.findByIdAndRemove(masterId);
  res.json(deletedService);
} catch (error) {
  res.status(404).json({ message: "master not found" });
}
});


// Lamination all routes 

router.get("/lamination", async (req, res) => {

  try{
      const masterData = await CarLaminationTypeModel.find()
      res.send(masterData)
  }catch(e){
      res.status(404).send({message : `Data not found${e}`})
  }

})

router.post("/cars/lamination", async (req, res) => {
  try {
    // Check if the lamination type already exists
    const existingLamination = await CarLaminationTypeModel.findOne({ lamination_Type: req.body.lamination_Type });
    if (existingLamination) {
      return res.status(409).json({ message: "Lamination type already exists" });
    }

    // If lamination type does not exist, save it to the database
    const newLamination = new CarLaminationTypeModel(req.body);
    await newLamination.save();
    res.status(201).json(newLamination);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.post("/cars/lamination", async (req, res) => {
  try {
    // Check if the lamination type already exists
    const existingLamination = await CarLaminationTypeModel.findOne({ lamination_Type: req.body.lamination_Type });
    if (existingLamination) {
      return res.status(409).json({ message: "Lamination type already exists" });
    }

    // If lamination type does not exist, save it to the database
    const newLamination = new CarLaminationTypeModel(req.body);
    await newLamination.save();
    res.status(201).json(newLamination);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.patch("/lamination/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    // Find the document by ID and update it with the new data
    const updatedService = await CarLaminationTypeModel.findByIdAndUpdate(id, updatedData, { new: true });

    // Check if the document was found and updated successfully
    if (!updatedService) {
      return res.status(404).json({ message: "Vehicle type not found" });
    }

    res.status(200).json(updatedService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/lamination/:id", async (req, res) => {
const masterId = req.params.id;
try {
  const deletedService = await CarLaminationTypeModel.findByIdAndRemove(masterId);
  res.json(deletedService);
} catch (error) {
  res.status(404).json({ message: "master not found" });
}
});

module.exports = router;
