const express = require('express');
const router = express.Router();
const Client = require('../models/ClientModel'); // Adjust the path as needed

// Page: Get all clients
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Page: Create a new client
router.post('/', async (req, res) => {
  try {
    const newClient = new Client(req.body);
    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Page: Update a client by ID
router.patch('/:id', async (req, res) => {
  const clientId = req.params.id;
  try {
    const updatedClient = await Client.findByIdAndUpdate(clientId, req.body, {
      new: true,
    });
    res.json(updatedClient);
  } catch (error) {
    res.status(404).json({ message: 'Client not found' });
  }
});

// Page: Delete a client by ID
router.delete('/:id', async (req, res) => {
  const clientId = req.params.id;
  try {
    const deletedClient = await Client.findByIdAndRemove(clientId);
    res.json(deletedClient);
  } catch (error) {
    res.status(404).json({ message: 'Client not found' });
  }
});

module.exports = router;
