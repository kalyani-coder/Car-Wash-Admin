
const express = require('express');
const router = express.Router();
const Booking = require('../models/BookingModel');


//get

router.get("/", async (req, res) => {

    try {
        const booking = await Booking.find();
        res.json(booking);
    } catch (e) {
        res.status(404).json({ message: "Internal server error" });
    }
});

// post 
router.post("/" , async (req, res) => {
    try{
        const newBooking = new Booking(req.body);
        await newBooking.save();
        res.status(201).json(newBooking);
    }catch(e){
        res.status(404).json({message : "Internal server error"});
    }
});

// get by ID
router.get("/:id", async (req, res) => {
  const bookingId = req.params.id;
  try {
      const booking = await Booking.findById(bookingId);
      if (!booking) {
          return res.status(404).json({ message: "Booking not found" });
      }
      res.json(booking);
  } catch (e) {
      res.status(500).json({ message: "Internal server error" });
  }
});

// patch 
router.patch('/:id', async (req, res) => {
    const bookingId = req.params.id;
    try {
      const updateBooking = await Booking.findByIdAndUpdate(bookingId, req.body, {
        new: true,
      });
      res.json(updateBooking);
    } catch (error) {
      res.status(404).json({ message: 'Promotion not found' });
    }
  });

  
  // delete 
router.delete('/:id', async (req, res) => {
    const promotionId = req.params.id;
    try {
      const deletedBooking = await Booking.findByIdAndRemove(promotionId);
      res.json(deletedBooking);
    } catch (error) {
      res.status(404).json({ message: 'Promotion not found' });
    }
  });


module.exports = router;
