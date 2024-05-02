const express = require("express");
const router = express.Router();
const NewAddStocks = require("../models/AddStockModel");

// GET METHOD
router.get("/", async (req, res) => {
  try {
    const topservice = await NewAddStocks.find();
    res.json(topservice);
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});



// POST METHOD

router.post("/", async (req, res) => {
  try {
    const topService = new NewAddStocks(req.body);
    await topService.save();
    res.status(201).json(topService);
  } catch (e) {
    console.error(e); // Log the error to the console
    res.status(500).json({ message: "Internal server error" });
  }
});

//PATCH METHOD
router.patch("/:id", async (req, res) => {
  const topServiceId = req.params.id;
  try {
    const updateTopService = await NewAddStocks.findByIdAndUpdate(
      topServiceId,
      req.body,
      {
        new: true,
      }
    );
    res.json(updateTopService);
  } catch (e) {
    res.status(404).json({ message: "Service not found" });
  }
});

//Delete Method
router.delete("/:id", async (req, res) => {
  const topServiceId = req.params.id;
  try {
    const deletedTopService = await NewAddStocks.findByIdAndRemove(topServiceId);
    res.json(deletedTopService);
  } catch (error) {
    res.status(404).json({ message: "Service not found" });
  }
});

//   get by id
router.get("/:id", async (req, res) => {
  const topServiceId = req.params.id;
  try {
    const newNewAddStocks = await NewAddStocks.findById(topServiceId);
    if (!newNewAddStocks) {
      return res.status(404).json({ message: "Top services not found" });
    }
    res.json(newNewAddStocks);
  } catch (error) {
    res.status(404).json({ message: "internal server error" });
  }
});

module.exports = router;
