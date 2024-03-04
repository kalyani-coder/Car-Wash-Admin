

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


// router.post("/", async (req, res) => {
//     try {
//       const { clientId, name, email, phone, address, vehicle_Make, model_Year, vehicle_Number ,vehicle_Category , vehicle_Treatment} = req.body;
  
//       // Generate a unique JobCardId
//       const jobCardId = uuid.v4();
  
//      // Get current date in "dd/mm/yyyy" format
//      const currentDate = new Date();
//     //  const formattedDate = currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
 
  
//       const jobCard = new newJobCardSchema({
//         clientId,
//         JobCardId: jobCardId,
//         name,
//         email,
//         phone,
//         address,
//         vehicle_Make,
//         model_Year,
//         vehicle_Number,
//         jobCardDate: currentDate, // Assign currentDate to jobCardDate field,
//         vehicle_Category,
//         vehicle_Treatment,
//       });
  
//       await jobCard.save();
//       res.status(201).send({ message: "Job Card Created Successfully", jobCardId });
  
//     } catch (err) {
//       console.error("Error creating job card:", err);
//       res.status(500).send({ message: "Can't post Data" });
//     }
//   });


router.post("/", async (req, res) => {
    try {
        const { clientId, name, email, phone, address, vehicle_Make, model_Year, vehicle_Number ,vehicle_Category , vehicle_Treatment, vehicle_Type, wash_type, coating, paint_protection_field, window_films, vinly_wraps, premium_seat_cover, lamination, interiour_decor } = req.body;

        // Generate a unique JobCardId
        const jobCardId = uuid.v4();

        // Get current date
        const currentDate = new Date();

        const jobCard = new newJobCardSchema({
            clientId,
            JobCardId: jobCardId,
            name,
            email,
            phone,
            address,
            vehicle_Make,
            model_Year,
            vehicle_Number,
            jobCardDate: currentDate, // Assign currentDate to jobCardDate field,
            vehicle_Category,
            vehicle_Treatment,
            vehicle_Type,
            wash_type,
            coating,
            paint_protection_field,
            window_films,
            vinly_wraps,
            premium_seat_cover,
            lamination,
            interiour_decor
        });

        await jobCard.save();
        res.status(201).send({ message: "Job Card Created Successfully", jobCardId });

    } catch (err) {
        console.error("Error creating job card:", err);
        res.status(500).send({ message: "Can't post Data" });
    }
});



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