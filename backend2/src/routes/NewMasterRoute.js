const express = require('express')
const router = express.Router()

const { MasterModel, VehicleTypeModel } = require('../models/NewMasterModels');




router.get('/cars', async (req, res) => {
    try {
        // Retrieve all entries from the database
        const allEntries = await MasterModel.find();

        res.status(200).send(allEntries); // Respond with all entries
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.post('/cars/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const washTypesToAdd = req.body.wash_types;
        const vehicleTypesToAdd = req.body.vehicle_types; // Assuming the request body contains vehicle_types array

        // Update the document with both wash_types and vehicle_types
        const updatedDocument = await MasterModel.findByIdAndUpdate(id, {
            $push: { 
                wash_types: { $each: washTypesToAdd },
                vehicle_types: { $each: vehicleTypesToAdd }
            }
        }, { new: true });

        if (!updatedDocument) {
            return res.status(404).json({ message: "Document not found" });
        }

        res.status(200).json(updatedDocument);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});




router.delete("/cars/:id", async (req, res) => {
    try {
        const MasterId = req.params.id;

        // Find the document by ID and delete it
        const deletedMaster = await MasterModel.findByIdAndDelete(MasterId);

        if (!deletedMaster) {
            // If the document with the specified ID doesn't exist
            return res.status(404).send({ message: "Master not found" });
        }

        res.status(200).send({ message: "Master deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal server error" });
    }
});





module.exports = router;