const express = require("express");
const router = express.Router();
const Promotion = require("../models/PromotionModel"); // Adjust the path as needed
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage })

// Page: Get all promotions
router.get("/", async (req, res) => {
  try {
    const promotions = await Promotion.find();
    res.json(promotions);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:field/:value", async (req, res) => {
  const field = req.params.field;
  const value = req.params.value.replace("_", " ");
  if (value && field) {
    try {
      const bookings = await Promotion.find({ [field]: value });
      res.json(bookings);
    } catch (e) {
      res.status(400).json({ message: "Bad request" });
    }
  } else {
    res.status(400).json({ message: "Bad request" });
  }
});

// Page: Create a new promotion
// router.post("/", async (req, res) => {
//   try {
//     const newPromotion = new Promotion(req.body);
//     await newPromotion.save();
//     res.status(201).json(newPromotion);
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (req.file) {
      const publicUrl = `http://backend.eastwayvisa.com/public/uploads/${req.file.originalname}`;
       
      const imageData = new Promotion({
        filename: req.file.originalname,
        path: req.file.path,
        image: publicUrl,
        title: req.body.title,
        description: req.body.description,
        promotionPrice: req.body.promotionPrice,
        service : req.body.service,
        couponCode: req.body.couponCode,
        
      });

      await imageData.save();
      res.status(201).json(imageData);
    } else {
      res.status(400).json({ error: 'No file uploaded' });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal server error"});
  }
});

// Page: Update a promotion by ID
router.patch("/:id", async (req, res) => {
  const promotionId = req.params.id;
  try {
    const updatedPromotion = await Promotion.findByIdAndUpdate(
      promotionId,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedPromotion);
  } catch (error) {
    res.status(404).json({ message: "Promotion not found" });
  }
});

// Page: Delete a promotion by ID
router.delete("/:id", async (req, res) => {
  const promotionId = req.params.id;
  try {
    const deletedPromotion = await Promotion.findByIdAndRemove(promotionId);
    res.json(deletedPromotion);
  } catch (error) {
    res.status(404).json({ message: "Promotion not found" });
  }
});

// get by id
router.get("/:id", async (req, res) => {
  const promotionId = req.params.id;
  try {
    const newPromotion = await Promotion.findById(promotionId);
    if (!newPromotion) {
      return res.status(404).json({ message: "Promotion not found" });
    }
    res.json(newPromotion);
  } catch (err) {
    res.status(404).json({ message: "Internal server error" });
  }
});

module.exports = router;
