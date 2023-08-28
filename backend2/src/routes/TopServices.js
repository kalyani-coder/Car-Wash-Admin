

const express = require('express')
const router = express.Router()
const topServices = require('../models/TopServicesModel')

// GET METHOD
router.get( "/" , async (req, res) => {
    try{

        const topservice = await topServices.find()
        res.json(topservice)
    } catch(e){
        res.status(500).json({message : "Internal Server Error"})
    }
})

// POST METHOD

router.post("/", async (req, res) => {
    try {
        const topService = new topServices(req.body)
        await topService.save()
        res.status(201).json(topService)
    } catch (e) {
        console.error(e); // Log the error to the console
        res.status(500).json({ message: "Internal server error" })
    }
})

//PATCH METHOD
router.patch("/:id" , async (req, res) => {
    const topServiceId = req.params.id
    try{
        const updateTopService = await topServices.findByIdAndUpdate(topServiceId, req.body, {
            new: true
        });
        res.json(updateTopService)
    }catch(e){
        res.status(404).json({ message: 'Service not found' });
    }
})

//Delete Method 
router.delete('/:id', async (req, res) => {
    const topServiceId = req.params.id;
    try {
      const deletedTopService = await topServices.findByIdAndRemove(topServiceId);
      res.json(deletedTopService);
    } catch (error) {
      res.status(404).json({ message: 'Service not found' });
    }
  });


module.exports = router
