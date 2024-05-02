const express = require('express');
const router = express.Router();
const AgentLocation = require('../models/AgentLocation');

router.get('/', async (req, res) => {
  try {
    const clients = await AgentLocation.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/bookingID/:bookingID', async (req, res) => {
  try {
    const { bookingID } = req.params;

    if (!bookingID) {
      return res.status(400).json({ message: 'Invalid bookingID' });
    }

    const agentLocation = await AgentLocation.findOne({ bookingID });

    if (!agentLocation) {
      return res.status(404).json({ message: 'Agent location not found' });
    }

    res.json(agentLocation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get("/:field/:value", async (req, res) => {
  const field = req.params.field;
  const value = req.params.value.replace("_", " ");
  if (value && field) {
    try {
      let bookings;
      const schemaType = AgentLocation.schema.path(field);
      if (schemaType instanceof mongoose.Schema.Types.Array) {
        bookings = await AgentLocation.find({ [field]: { $in: [value] } });
      } else {
        bookings = await AgentLocation.find({ [field]: value });
      }
      res.json(bookings);
    } catch (e) {
      res.status(400).json({ message: "Bad request" });
    }
  } else {
    res.status(400).json({ message: "Bad request" });
  }
});

router.post('/', async (req, res) => {
  try {
    const newAgentLocation = new AgentLocation(req.body);
    await newAgentLocation.save();
    res.status(201).json(newAgentLocation);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.patch('/:id', async (req, res) => {
  const clientId = req.params.id;
  try {
    const updatedAgentLocation = await AgentLocation.findByIdAndUpdate(
      clientId,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedAgentLocation);
  } catch (error) {
    res.status(404).json({ message: 'AgentLocation not found' });
  }
});

router.delete('/:id', async (req, res) => {
  const clientId = req.params.id;
  try {
    const deletedAgentLocation = await AgentLocation.findByIdAndRemove(
      clientId
    );
    res.json(deletedAgentLocation);
  } catch (error) {
    res.status(404).json({ message: 'AgentLocation not found' });
  }
});

router.get('/:id', async (req, res) => {
  const clientId = req.params.id;

  try {
    const newAgentLocation = await AgentLocation.findById(clientId);
    if (!newAgentLocation) {
      return res.status(404).json({ message: 'AgentLocation not Found' });
    }
    res.json(newAgentLocation);
  } catch (e) {
    res.status(404).json({
      message: 'AgentLocation by id not found Internal server error',
    });
  }
});

module.exports = router;
