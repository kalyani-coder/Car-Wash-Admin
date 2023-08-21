const express = require("express");
const mongoose = require("mongoose");
const Service = require("../models/service");
const router = express.Router();

router.post("/", (req, res, next) => {
  const {
    serviceName,
    serviceCategory,
    servicePrice,
    serviceDescription,
    serviceOffer,
    serviceImage,
  } = req.body;

  const newService = new Service({
    serviceName,
    serviceCategory,
    servicePrice,
    serviceDescription,
    serviceOffer,
    serviceImage: "Image",
  });

  try {
    newService.save();
  } catch (err) {
    console.log(err);
  }

  res.status(201).json(Service);
});

router.get("/", async (req, res) => {
  try {
    const services = await Service.find().exec();
    res.status(200).json(services.map((service) => service.toObject()));
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/:serviceId", async (req, res) => {
  const { serviceId } = req.params;
  try {
    await Service.findByIdAndDelete(serviceId);
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.patch("/:serviceId", async (req, res) => {
  const { serviceId } = req.params;
  const {
    serviceName,
    serviceCategory,
    servicePrice,
    serviceDescription,
    serviceOffer,
    serviceImage,
  } = req.body;

  try {
    await Service.findByIdAndUpdate(serviceId, {
      serviceName,
      serviceCategory,
      servicePrice,
      serviceDescription,
      serviceOffer,
      serviceImage,
    });
    res.status(200).json({ message: "Service updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
