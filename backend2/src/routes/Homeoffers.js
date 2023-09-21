
const express = require('express')
const HomeofferSchema = require ('../models/HomeOffersModel')
const { route } = require('./Services')
const router = express.Router()



//Get method 
router.get("/" , async (req, res) => {

    try{
    const Homeoffers = await HomeofferSchema.find()
        res.status(201).json(Homeoffers)
    }catch(error){
        res.status(404).json({message : "Internal server error"})
    }
    
})

router.post('/' , async (req, res) => {

    try{
        const homeoffers = new HomeofferSchema(req.body)
        await homeoffers.save()
        res.status(201).json(homeoffers)
    }catch(e){
        res.status(404).json({message : "Data is not posted error"})
    }
})

// path method

router.patch('/:id' , async  (req,res) => {
    try{
        const homeofferId = req.params.id
        const updateAgent = await HomeofferSchema.findByIdAndUpdate(homeofferId , req.body , {
            new : true

        })
        res.status(201).json(updateAgent)
    }catch(er){

        res.status(404).json({message : "Internal server error"})
    }
})
module.exports = router;

//delete 

router.delete('/:id' , async (req, res) => {
    try{

        const homeofferId = req.params.id
        const deleteHomeoffers = await HomeofferSchema.findByIdAndDelete(homeofferId)
        res.status(201).json(deleteHomeoffers)
    }catch(e){
         res.status(404).json({message : "internal server error" })
    }
})