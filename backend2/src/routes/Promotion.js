const express = require('express');
const router = express.Router();
const Promotion = require('../models/PromotionModel'); // Adjust the path as needed

// Page: Get all promotions
router.get('/', async (req, res) => {
  try {
    const promotions = await Promotion.find();
    res.json(promotions);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Page: Create a new promotion
router.post('/', async (req, res) => {
  try {
    const newPromotion = new Promotion(req.body);
    await newPromotion.save();
    res.status(201).json(newPromotion);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Page: Update a promotion by ID
router.patch('/:id', async (req, res) => {
  const promotionId = req.params.id;
  try {
    const updatedPromotion = await Promotion.findByIdAndUpdate(promotionId, req.body, {
      new: true,
    });
    res.json(updatedPromotion);
  } catch (error) {
    res.status(404).json({ message: 'Promotion not found' });
  }
});

// Page: Delete a promotion by ID
router.delete('/:id', async (req, res) => {
  const promotionId = req.params.id;
  try {
    const deletedPromotion = await Promotion.findByIdAndRemove(promotionId);
    res.json(deletedPromotion);
  } catch (error) {
    res.status(404).json({ message: 'Promotion not found' });
  }
});

// get by id 
router.get('/:id' , async (req , res) => {

  const promotionId = req.params.id
  try{
      const newPromotion = await Promotion.findById(promotionId)
      if(!newPromotion){
        return res.status(404).json({message : "Promotion not found"})
      }
      res.json(newPromotion)
      
  }catch(err){
    res.status(404).json({message : "Internal server error"})
  }
})

module.exports = router;
