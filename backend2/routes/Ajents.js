

// this code for trial to upload actual image path not use in backend 

const express = require('express');
const router = express.Router();
const Agent = require('../models/AjentsModel'); // Adjust the path as needed

// Page: Get all services
router.get('/', async (req, res) => {
  try {
    const Agents = await Agent.find();
    res.json(Agents);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Page: Create a new service
router.post('/', async (req, res) => {
    const  {base64} = req.body
  try {
    // const newAgents = new Agent(req.body);
    // await newAgents.save();
    // res.status(201).json(newAgents);
   await Agent.create({agentImage:base64})
    res.send({Status:"OK Data successfully sent"})
  } catch (error) {
    // res.status(500).json({ message: 'Internal Server Error' });
    // res.send({Status:"error" , error })
  }
});



// Page: Update a service by ID
// router.patch('/:id', async (req, res) => {
//   const agentId = req.params.id;
//   try {
//     const updatedagent = await Agent.findByIdAndUpdate(agentId, req.body, {
//       new: true,
//     });
//     res.json(updatedagent);
//   } catch (error) {
//     res.status(404).json({ message: 'Service not found' });
//   }
// });

// Page: Delete a service by ID
// router.delete('/:id', async (req, res) => {
//     const agentId = req.params.id;
//     try {
//       const deletedagent = await Agent.findByIdAndRemove(agentId);
//       res.json(deletedagent);
//     } catch (error) {
//       res.status(404).json({ message: 'Service not found' });
//     }
//   });

module.exports = router;







