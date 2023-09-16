
const express = require('express');
const router = express.Router();
const Notification = require('../models/NotificationModel'); // Adjust the path as needed

// Page: Get all services
router.get('/', async (req, res) => {
  try {
    const notification = await Notification.find();
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Page: Create a new service
router.post('/', async (req, res) => {
  try {
    const newService = new Notification(req.body);
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Page: Update a service by ID
router.patch('/:id', async (req, res) => {
  const serviceId = req.params.id;
  try {
    const updatedService = await Notification.findByIdAndUpdate(serviceId, req.body, {
      new: true,
    });
    res.json(updatedService);
  } catch (error) {
    res.status(404).json({ message: 'Service not found' });
  }
});

// Page: Delete a service by ID
router.delete('/:id', async (req, res) => {
  const serviceId = req.params.id;
  try {
    const deletedService = await Notification.findByIdAndRemove(serviceId);
    res.json(deletedService);
  } catch (error) {
    res.status(404).json({ message: 'Service not found' });
  }
});

// get by id /

router.get('/:id' , async (req, res) => {

  const serviceId = req.params.id

  try{
    const newService = await Notification.findById(serviceId)
    if(!newService){
      return res.status(404).json({message : "services not found"})
    }
    res.json(newService)
  }catch(err){
    res.status(404).json({message : "internal server error "})
  }
})

module.exports = router;
