

const express = require('express');
const router = express.Router();
const newJobCardSchema = require("../models/JobCardModel")
const uuid = require('uuid');

const mongoose = require('mongoose')

router.get("/", async (req, res) => {
    try {

        const jobCard = await newJobCardSchema.find()
        res.send(jobCard)
    } catch (err) {
        res.sendStatus(404).send({ message: "Internal server Error " })
    }
})


router.post("/", async (req, res) => {
    try {
        const { clientId, name, email, phone, address, vehicle_Make, model_Year, vehicle_Number, vehicle_Category, vehicle_Treatment, vehicle_Type, wash_type, coating, paint_protection_field, window_films, vinly_wraps, premium_seat_cover, lamination, interiour_decor,
            wash_type_price,
            coating_Price,
            paint_protection_field_Price,
            window_films_Price,
            vinly_wraps_Price,
            premium_seat_cover_Price,
            lamination_Price,
            interiour_decor_Price,
            TotalAmount,
            treatment,
         } = req.body;

        const jobCardId = uuid.v4();
        const count = await newJobCardSchema.countDocuments();
        const jobcardNumber = String(count + 1).padStart(2, '0');
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
            jobCardDate: currentDate,
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
            interiour_decor,

            wash_type_price,
            coating_Price,
            paint_protection_field_Price,
            window_films_Price,
            vinly_wraps_Price,
            premium_seat_cover_Price,
            lamination_Price,
            interiour_decor_Price,
            TotalAmount,
            treatment,
            jobcardNumber: jobcardNumber
        });

        await jobCard.save();
        res.status(201).send({ message: "Job Card Created Successfully", jobCardId });

    } catch (err) {
        console.error("Error creating job card:", err);
        res.status(500).send({ message: "Can't post Data" });
    }
});



router.get("/:id", async (req, res) => {

    const ClientId = req.params.id;

    try {
        const newClient = await newJobCardSchema.findById(ClientId)
        if (!newClient) {
            res.status(404).send("Clinet not found")
        }
        res.send(newClient)

    } catch (err) {
        res.status(404).send(err.message)
    }
})



router.delete("/:id", async (req, res) => {
    const jobId = req.params.id

    try {
        const deleteClient = await newJobCardSchema.findByIdAndDelete(jobId)
        if (!deleteClient) {
            return res.status(404).send({ message: "Job Card not found" })
        }
        res.status(200).send({ message: "JobCard deleted Successfully" })
    } catch (err) {
        res.status(500).send({ message: "Job card Not be Deleted" })
    }
})

// router.get("/search/:key", async (req, res) => {
//     const key = req.params.key;
//     try {
//         console.log(key);
        
//         // Check if the provided key is numeric (assuming it's a contact number)
//         if (!isNaN(key)) {
//             const searchResultsByPhone = await newJobCardSchema.find({ "phone": key });
//             res.json(searchResultsByPhone);
//         } else {
//             // If the key is not numeric, treat it as a name and perform a case-insensitive search
//             const searchResultsByName = await newJobCardSchema.find({ "name": { $regex: new RegExp(key, 'i') } });
//             res.json(searchResultsByName);
//         }
//     } catch (e) {
//         console.error(e);
//         res.status(500).json("Internal server Error");
//     }
// });


// search by jobCard number  
router.get("/search/:key", async (req, res) => {
    const key = req.params.key;
    try {
        console.log(key);
        
        // Check if the provided key is numeric and starts with "JC" (assuming it's a jobcard number)
        if (!isNaN(key)) {
            // Find job cards with the exact jobcardNumber
            const searchResultsByJobcardNumber = await newJobCardSchema.find({ "jobcardNumber": key });
            res.json(searchResultsByJobcardNumber);
        }
        // Check if the provided key is numeric (assuming it's a phone number)
        else if (!isNaN(key)) {
            const searchResultsByPhone = await newJobCardSchema.find({ "phone": key });
            res.json(searchResultsByPhone);
        } 
        // If the key is a valid ObjectId, perform a search by _id
        else if (mongoose.Types.ObjectId.isValid(key)) {
            const searchResultsById = await newJobCardSchema.findById(key);
            res.json(searchResultsById ? [searchResultsById] : []);
        } 
        // Treat the key as a name and perform a case-insensitive search
        else {
            const searchResultsByName = await newJobCardSchema.find({ "name": { $regex: new RegExp(key, 'i') } });
            res.json(searchResultsByName);
        }
    } catch (e) {
        console.error(e);
        res.status(500).json("Internal server Error");
    }
});


// search by Phone Number
// router.get("/search/:key", async (req, res) => {
//     const key = req.params.key;
//     try {
//         console.log(key);
        
//         // Check if the provided key matches the pattern for a jobcard number (e.g., "JC07")
//         if (/^JC\d+$/.test(key)) {
//             // Extract numeric part from jobcard number
//             const numericKey = key.replace(/^JC/, '');
//             // Find job cards with the exact jobcardNumber
//             const searchResultsByJobcardNumber = await newJobCardSchema.find({ "jobcardNumber": numericKey });
//             res.json(searchResultsByJobcardNumber);
//         } 
//         // Check if the provided key matches the pattern for a phone number
//         else if (/^\d+$/.test(key)) {
//             const searchResultsByPhone = await newJobCardSchema.find({ "phone": key });
//             res.json(searchResultsByPhone);
//         } 
//         // If the key is a valid ObjectId, perform a search by _id
//         else if (mongoose.Types.ObjectId.isValid(key)) {
//             const searchResultsById = await newJobCardSchema.findById(key);
//             res.json(searchResultsById ? [searchResultsById] : []);
//         } 
//         // Treat the key as a name and perform a case-insensitive search
//         else {
//             const searchResultsByName = await newJobCardSchema.find({ "name": { $regex: new RegExp(key, 'i') } });
//             res.json(searchResultsByName);
//         }
//     } catch (e) {
//         console.error(e);
//         res.status(500).json("Internal server Error");
//     }
// });





module.exports = router;