const express = require("express");
const router = express.Router();
const Service = require("../models/ServicesModel"); // Adjust the path as needed

// Page: Get all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Page: Create a new service
router.post("/", async (req, res) => {
  try {
    const newService = new Service(req.body);
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:field/:value", async (req, res) => {
  const field = req.params.field;
  const value = req.params.value.replace("_", " ");
  if (value && field) {
    try {
      const bookings = await Service.find({ [field]: value });
      res.json(bookings);
    } catch (e) {
      res.status(400).json({ message: "Bad request" });
    }
  } else {
    res.status(400).json({ message: "Bad request" });
  }
});

// Page: Update a service by ID
router.patch("/:id", async (req, res) => {
  const serviceId = req.params.id;
  try {
    const updatedService = await Service.findByIdAndUpdate(
      serviceId,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedService);
  } catch (error) {
    res.status(404).json({ message: "Service not found" });
  }
});

// Page: Delete a service by ID
router.delete("/:id", async (req, res) => {
  const serviceId = req.params.id;
  try {
    const deletedService = await Service.findByIdAndRemove(serviceId);
    res.json(deletedService);
  } catch (error) {
    res.status(404).json({ message: "Service not found" });
  }
});

// get by id /

router.get("/:id", async (req, res) => {
  const serviceId = req.params.id;

  try {
    const newService = await Service.findById(serviceId);
    if (!newService) {
      return res.status(404).json({ message: "services not found" });
    }
    res.json(newService);
  } catch (err) {
    res.status(404).json({ message: "internal server error " });
  }
});

module.exports = router;
