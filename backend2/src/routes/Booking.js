const express = require("express");
const router = express.Router();
const Booking = require("../models/BookingModel");

//get

router.get("/", async (req, res) => {
  try {
    const booking = await Booking.find();
    res.json(booking);
  } catch (e) {
    res.status(404).json({ message: "Internal server error" });
  }
});

//get by status
// router.get("/status/:status", async (req, res) => {
//   const status = req.params.status;

//   try {
//     const bookings = await Booking.find({ status: status });
//     res.json(bookings);
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// bookings get by status and agents id 

router.get("/agentId/:agentId", async (req, res) => {
  const agentId = req.params.agentId;

  if (agentId) {
    try {
      const bookings = await Booking.find({ agentId: agentId });
      res.json(bookings);
    } catch (e) {
      res.status(400).json({ message: "Bad request" });
    }
  } else {
    res.status(400).json({ message: "Bad request" });
  }
});


router.get("/:field/:value", async (req, res) => {
  const field = req.params.field;
  const value = req.params.value.replace("_", " ");
  if (value && field) {
    try {
      const bookings = await Booking.find({ [field]: value });
      res.json(bookings);
    } catch (e) {
      res.status(400).json({ message: "Bad request" });
    }
  } else {
    res.status(400).json({ message: "Bad request" });
  }
});


// post
router.post("/", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (e) {
    res.status(404).json({ message: "Internal server error" });
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
router.patch("/:id", async (req, res) => {
  const bookingId = req.params.id;
  try {
    const updateBooking = await Booking.findByIdAndUpdate(bookingId, req.body, {
      new: true,
    });
    res.json(updateBooking);
  } catch (error) {
    res.status(404).json({ message: "Promotion not found" });
  }
});

// delete
router.delete("/:id", async (req, res) => {
  const promotionId = req.params.id;
  try {
    const deletedBooking = await Booking.findByIdAndRemove(promotionId);
    res.json(deletedBooking);
  } catch (error) {
    res.status(404).json({ message: "Promotion not found" });
  }
});

module.exports = router;
