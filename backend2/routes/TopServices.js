const express = require("express");
const router = express.Router();
const topServices = require("../models/TopServicesModel");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// GET METHOD
// router.get("/", async (req, res) => {
//   try {
//     const topservice = await topServices.find();
//     res.json(topservice);
//   } catch (e) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

router.get("/:field/:value", async (req, res) => {
  const field = req.params.field;
  const value = req.params.value.replace("_", " ");
  if (value && field) {
    try {
      const bookings = await topServices.find({ [field]: value });
      res.json(bookings);
    } catch (e) {
      res.status(400).json({ message: "Bad request" });
    }
  } else {
    res.status(400).json({ message: "Bad request" });
  }
});

// POST METHOD

// router.post("/", async (req, res) => {
//   try {
//     const topService = new topServices(req.body);
//     await topService.save();
//     res.status(201).json(topService);
//   } catch (e) {
//     console.error(e); // Log the error to the console
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

//PATCH METHOD
router.patch("/:id", async (req, res) => {
  const topServiceId = req.params.id;
  try {
    const updateTopService = await topServices.findByIdAndUpdate(
      topServiceId,
      req.body,
      {
        new: true,
      }
    );
    res.json(updateTopService);
  } catch (e) {
    res.status(404).json({ message: "Service not found" });
  }
});

//Delete Method
router.delete("/:id", async (req, res) => {
  const topServiceId = req.params.id;
  try {
    const deletedTopService = await topServices.findByIdAndRemove(topServiceId);
    res.json(deletedTopService);
  } catch (error) {
    res.status(404).json({ message: "Service not found" });
  }
});

//   get by id
router.get("/:id", async (req, res) => {
  const topServiceId = req.params.id;
  try {
    const newTopServices = await topServices.findById(topServiceId);
    if (!newTopServices) {
      return res.status(404).json({ message: "Top services not found" });
    }
    res.json(newTopServices);
  } catch (error) {
    res.status(404).json({ message: "internal server error" });
  }
});


router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (req.file) {
      const publicUrl = `http://localhost:5000/public/uploads/${req.file.originalname}`;

      const imageData = new topServices({
        filename: req.file.originalname,
        path: req.file.path,
        image: publicUrl,
        title: req.body.title,
        description: req.body.description,
        offer: req.body.offer,
        price: req.body.price,
        category: req.body.category,
      });



      await imageData.save();
      res.status(201).json(imageData);
    } else {
      res.status(400).json({ error: 'No file uploaded' });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});


// for getting id with dataentry 
// if u dont want to send path and filename in api then use this line 131 -path and -filename
router.get('/', async (req, res) => {
  try {
    const imageData = await topServices.find({}, '-__v -path -filename'); // Exclude the '__v' field
    res.json(imageData);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
