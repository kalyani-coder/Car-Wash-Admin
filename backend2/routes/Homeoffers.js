
const express = require('express')
const HomeofferSchema = require ('../models/HomeOffersModel')
const { route } = require('./Services')
const router = express.Router()
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  const upload = multer({ storage: storage })



//Get method 
router.get("/" , async (req, res) => {

    try{
    const Homeoffers = await HomeofferSchema.find()
        res.status(201).json(Homeoffers)
    }catch(error){
        res.status(404).json({message : "Internal server error"})
    }
    
})

// router.post('/' , async (req, res) => {

//     try{
//         const homeoffers = new HomeofferSchema(req.body)
//         await homeoffers.save()
//         res.status(201).json(homeoffers)
//     }catch(e){
//         res.status(404).json({message : "Data is not posted error"})
//     }
// })


// post image for add offers 
router.post('/', upload.single('image'), async (req, res) => {
    try {
      if (req.file) {
        const publicUrl = `http://localhost:5000/public/uploads/${req.file.originalname}`;
         
        const imageData = new HomeofferSchema({
          filename: req.file.originalname,
          path: req.file.path,
          image: publicUrl,
          offerName :req.body.offerName,
          offer :req.body.selectedPercentage,
          homeservicesName : req.body.serviceName,
          description : req.body.description,
          totalPrice : req.body.totalPrice,
          startDate: req.body.startDate,
          endDate : req.body.endDate,
         
          
        });
  
        await imageData.save();
        res.status(201).json(imageData);
      } else {
        res.status(400).json({ error: 'No file uploaded' });
      }
    } catch (e) {
      res.status(500).json({ message: "Internal server error"});
    }
  });

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