const express = require("express");
const router = express.Router();
const topServices = require("../models/TopServicesModel");

// GET METHOD
router.get("/", async (req, res) => {
  try {
    const topservice = await topServices.find();
    res.json(topservice);
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

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

router.post("/", async (req, res) => {
  try {
    const topService = new topServices(req.body);
    await topService.save();
    res.status(201).json(topService);
  } catch (e) {
    console.error(e); // Log the error to the console
    res.status(500).json({ message: "Internal server error" });
  }
});

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

module.exports = router;
