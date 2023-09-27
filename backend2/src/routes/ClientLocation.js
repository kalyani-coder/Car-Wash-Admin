const express = require("express");
const router = express.Router();
const ClientLocation = require("../models/ClientLocation"); // Adjust the path as needed

// Page: Get all clients
router.get("/", async (req, res) => {
  try {
    const clients = await ClientLocation.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:field/:value", async (req, res) => {
  const field = req.params.field;
  const value = req.params.value.replace("_", " ");
  if (value && field) {
    try {
      const bookings = await ClientLocation.find({ [field]: value });
      res.json(bookings);
    } catch (e) {
      res.status(400).json({ message: "Bad request" });
    }
  } else {
    res.status(400).json({ message: "Bad request" });
  }
});

// Page: Create a new client
router.post("/", async (req, res) => {
  try {
    const newClientLocation = new ClientLocation(req.body);
    await newClientLocation.save();
    res.status(201).json(newClientLocation);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Page: Update a client by ID
router.patch("/:id", async (req, res) => {
  const clientId = req.params.id;
  try {
    const updatedClientLocation = await ClientLocation.findByIdAndUpdate(
      clientId,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedClientLocation);
  } catch (error) {
    res.status(404).json({ message: "ClientLocation not found" });
  }
});

// Page: Delete a client by ID
router.delete("/:id", async (req, res) => {
  const clientId = req.params.id;
  try {
    const deletedClientLocation = await ClientLocation.findByIdAndRemove(
      clientId
    );
    res.json(deletedClientLocation);
  } catch (error) {
    res.status(404).json({ message: "ClientLocation not found" });
  }
});

// get by id

router.get("/:id", async (req, res) => {
  const clientId = req.params.id;

  try {
    const newClientLocation = await ClientLocation.findById(clientId);
    if (!newClientLocation) {
      return res.status(404).json({ message: "ClientLocation not Found" });
    }
    res.json(newClientLocation);
  } catch (e) {
    res.status(404).json({
      message: "ClientLocation by id not found Internal server error",
    });
  }
});

module.exports = router;
