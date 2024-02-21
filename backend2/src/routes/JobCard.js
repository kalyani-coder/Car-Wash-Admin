

const express = require('express');
const router = express.Router();
const newJobCardSchema = require("../models/JobCardModel")
const uuid = require('uuid');

router.get("/", async(req, res) => {
    try{

        const jobCard = await newJobCardSchema.find()
        res.send(jobCard)
    }catch(err){
        res.sendStatus(404).send({message : "Internal server Error "})
    }
})

// router.post("/", async(req,res) => {
//     try{

//         const jobCard = new newJobCardSchema(req.body)
//         await jobCard.save()
//         res.status(201).send({message : "Job Card Created Successfully"})

//     }catch(err){
//         res.status(404).send({message : `Can't post Data${err}`})
//     }
// })

router.post("/", async (req, res) => {
    try {
      const { clientId, name, email, phone, address, vehicle_Make, model_Year, vehicle_Number } = req.body;
  
      // Generate a unique JobCardId
      const jobCardId = uuid.v4(); // Using UUID for generating a unique ID
  
      const jobCard = new newJobCardSchema({
        clientId,
        JobCardId: jobCardId,
        name,
        email,
        phone,
        address,
        vehicle_Make,
        model_Year,
        vehicle_Number
      });
  
      await jobCard.save();
      res.status(201).send({ message: "Job Card Created Successfully", jobCardId });
  
    } catch (err) {
      console.error("Error creating job card:", err);
      res.status(500).send({ message: "Can't post Data" });
    }
  });

  router.get("/jobCardId/:id", async (req, res) => {
    const jobCardId = req.params.id;
  
    try {
      const jobCard = await newJobCardSchema.findOne({ JobCardId: jobCardId });
      if (!jobCard) {
        return res.status(404).json({ message: "Job Card not found" });
      }
      res.json(jobCard);
    } catch (error) {
      console.error("Error fetching job card:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.get("/email/:email" , async(req,res)=>{
    const jobcardemail = req.params.email

    try{
        const email = await newJobCardSchema.findOne({email : jobcardemail})
        if(!email){
            res.status(404).json({message : "Email not found"})

        }
        res.send(email)
    }catch(err){
        res.status(404).send({message : "Internal server error"})
    }
  })

router.get("/:id", async(req, res) => {

    const ClientId = req.params.id;

    try{
        const newClient = await newJobCardSchema.findById(ClientId)
        if(!newClient){
            res.status(404).send("Clinet not found")        
        }
        res.send(newClient)

    }catch(err){
        res.status(404).send(err.message)
    }
})



router.delete("/:id", async(req, res) => {
    const jobId = req.params.id

    try{
        const deleteClient = await newJobCardSchema.findByIdAndDelete(jobId)
        if(!deleteClient){
            return res.status(404).send({message : "Job Card not found"})
        }
        res.status(200).send({message : "JobCard deleted Successfully"})
    }catch(err){
        res.status(500).send({message : "Job card Not be Deleted"})
    }
})

module.exports = router;