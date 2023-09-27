

const express = require('express')
const router = express.Router()
const newReviewSchema = require('../models/ReviewModel')


// get methos 

router.get('/' , async(req, res) => {

    try{
        const reviews = await newReviewSchema.find()
         res.json(reviews)
    }catch(err){

        res.status(404).json({
            message : "Internal server error"
        })
    }
})

router.post('/' , async(req, res) => {

    try{
        const newReviews = new newReviewSchema(req.body)
        await newReviews.save()
        res.status(201).json(newReviews)
    }catch(e){

        res.status(404).json({message : "Internal server error"})
    }
})

// path method  

router.patch('/:id' , async(req, res) => {
    const reviewsId = req.params.id
    try{
        const updateReviews = await newReviewSchema.findByIdAndUpdate( reviewsId, req.body , {
            new : true
        })
        res.status(201).json(updateReviews)
    } catch(e){

        res.status(404).json({message : "Internal server Error"})
    }
})

// delete mothod 

router.delete('/:id' , async(req, res) => {

    const reviewsId = req.params.id
    try{
        const deleteReview = await newReviewSchema.findByIdAndDelete(reviewsId)
        res.status(201).json(deleteReview)
    }catch(e){

        res.status(404).json({message : "Internal setver error"})
    }
})

// get by id  

router.get("/:id" , async(req, res) => {
    const reviewsId=  req.params.id;

    try{
            const newReviews = await newReviewSchema.findById(reviewsId)
            if(!newReviews){
                res.status(404).json({message : "Reviews not found"})
            }
            res.status(201).json(newReviews)
    }catch(e){
        res.status(404).json({message : "Internal server Error"})
    }
})

module.exports = router