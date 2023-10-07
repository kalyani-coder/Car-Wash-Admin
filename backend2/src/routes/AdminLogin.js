const express = require("express");
const router = express.Router();
const Adminlogin = require("../models/AdminLoginModel");

// GET METHOD
router.get("/", async (req, res) => {
  try {
    const topservice = await Adminlogin.find();
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
      const bookings = await Adminlogin.find({ [field]: value });
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
    const topService = new Adminlogin(req.body);
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
    const updateTopService = await Adminlogin.findByIdAndUpdate(
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
    const deletedTopService = await Adminlogin.findByIdAndRemove(topServiceId);
    res.json(deletedTopService);
  } catch (error) {
    res.status(404).json({ message: "Service not found" });
  }
});

//   get by id
router.get("/:id", async (req, res) => {
  const topServiceId = req.params.id;
  try {
    const newAdminlogin = await Adminlogin.findById(topServiceId);
    if (!newAdminlogin) {
      return res.status(404).json({ message: "Top services not found" });
    }
    res.json(newAdminlogin);
  } catch (error) {
    res.status(404).json({ message: "internal server error" });
  }
});

module.exports = router;
