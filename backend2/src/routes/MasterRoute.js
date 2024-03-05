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
    const newService = new CarWashTypeModel(req.body);
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/cars/:id", async (req, res) => {
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
    const newService = new CarCoatingTypeModel(req.body);
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/cars/:id", async (req, res) => {
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
    const newService = new CarpaintprotectionTypeModel(req.body);
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/cars/:id", async (req, res) => {
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
    const newService = new CarWindowFilmsTypeModel(req.body);
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/cars/:id", async (req, res) => {
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
    const newService = new CarVinylWrapsTypeModel(req.body);
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/cars/:id", async (req, res) => {
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
  const newService = new CarPremiumSeatTypeModel(req.body);
  await newService.save();
  res.status(201).json(newService);
} catch (error) {
  res.status(500).json({ message: "Internal Server Error" });
}
});

router.delete("/cars/:id", async (req, res) => {
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
  const newService = new CarInteriorTypeModel(req.body);
  await newService.save();
  res.status(201).json(newService);
} catch (error) {
  res.status(500).json({ message: "Internal Server Error" });
}
});

router.delete("/cars/:id", async (req, res) => {
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
  const newService = new CarLaminationTypeModel(req.body);
  await newService.save();
  res.status(201).json(newService);
} catch (error) {
  res.status(500).json({ message: "Internal Server Error" });
}
});

router.delete("/cars/:id", async (req, res) => {
const masterId = req.params.id;
try {
  const deletedService = await CarLaminationTypeModel.findByIdAndRemove(masterId);
  res.json(deletedService);
} catch (error) {
  res.status(404).json({ message: "master not found" });
}
});

module.exports = router;
