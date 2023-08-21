const express = require("express");
const Clients = require("../models/clients");
// const { Client } = require("socket.io/dist/client");
const router = express.Router();

router.post("/", (req, res) => {
  const {
    name,
    address,
    orderDetails,
    pincode,
    contactNumber,
    email,
    pickUpAddress,
  } = req.body;

  const newClient = new Clients({
    name,
    address,
    orderDetails,
    pincode,
    contactNumber,
    email,
    pickUpAddress,
  });

  try {
    newClient.save();
  } catch (err) {
    console.log(err);
  }
  res.status(201).json({ message: "Client added successfully" });
});

router.get("/", async (req, res, next) => {
  try {
    const clients = await Clients.find().exec();
    res.status(200).json(clients.map((client) => client.toObject()));
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/:clientId", async (req, res) => {
  const { clientId } = req.params;
  try {
    await Clients.findByIdAndDelete(clientId);
    res.status(200).json({ message: "Client deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.patch("/:clientId", async (req, res) => {
  const { clientId } = req.params;
  const {
    name,
    address,
    orderDetails,
    pincode,
    contactNumber,
    email,
    pickUpAddress,
  } = req.body;

  try {
    await Clients.findByIdAndUpdate(clientId, {
      name,
      address,
      orderDetails,
      pincode,
      contactNumber,
      email,
      pickUpAddress,
    });
    res.status(200).json({ message: "Client updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
