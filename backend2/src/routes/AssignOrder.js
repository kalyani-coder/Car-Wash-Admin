

const express = require('express')
const router = express.Router()
const AssignOrder = require('../models/AssignOrdersModel')

router.get("/" , async (req, res) => {
    try{
        const assignOrder = await AssignOrder.find()
        res.send(assignOrder);
    }catch(e){
        res.status(404).json({message : "Internal server Error"})
    }
})

router.post("/" , async (req, res) => {

    try{

        const newAssignOrder =  new AssignOrder(req.body)
        await newAssignOrder.save()
        res.status(201).json(newAssignOrder)
    }catch(e){
        res.status(404).json(" Internal Server error")
    }
})

router.patch("/:id" , async (req, res) => {

    const assignOrderId = req.params.id

    try{
        const updatedOrder = await AssignOrder.findByIdAndUpdate(assignOrderId, req.body, {
            new : true
        })
        res.json(updatedOrder)
    }catch(e){

        res.status(404).json({message: "Order Not found"})
    }
})

router.delete("/:id" , async (req, res) => {

    const assignOrderId = req.params.id
    try{
        
        const deletedOrder = await AssignOrder.findByIdAndDelete(assignOrderId)
        res.json(deletedOrder)
    }catch(e){
        res.status(404).json({message : "Order not found"})
    }
})
module.exports = router;