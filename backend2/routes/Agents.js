



// new code by developer 
const express = require("express");
const router = express.Router();
const newAgents = require("../models/AgentsModel");
// const AgentsLogin = require("../models/AgentsLoginModel");

const multer = require('multer');
const path = require('path');
const fs = require('fs');


const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// GET METHOD
router.get("/", async (req, res) => {
  try {
    const agents = await newAgents.find();
    res.json(agents);
  } catch (e) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:field/:value", async (req, res) => {
  const field = req.params.field;
  const value = req.params.value.replace("_", " ");
  if (value && field) {
    try {
      const bookings = await newAgents.find({ [field]: value });
      res.json(bookings);
    } catch (e) {
      res.status(400).json({ message: "Bad request" });
    }
  } else {
    res.status(400).json({ message: "Bad request" });
  }
});
// GET BY ID

router.get("/:id", async (req, res) => {
  const agentId = req.params.id;
  try {
    const agent = await newAgents.findById(agentId);
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }
    res.json(agent);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST METHOD

// router.post("/", async (req, res) => {
//   try {
//     const newagents = new newAgents(req.body);
//     await newagents.save();
//     res.status(201).json(newagents);
//   } catch (e) {
//     console.error(e); // Log the error to the console
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

router.post("/login", async (req, res) => {
  const { ident, password } = req.body;
  try {
    const numIdent = Number(ident);
    var client;
    if (!isNaN(numIdent)) {
      client = await newAgents.findOne({
        $or: [{ contactNumber: numIdent }],
      });
    } else {
      client = await newAgents.findOne({
        $or: [{ email: ident }],
      });
    }

    if (!client) {
      res.status(200).json({
        message: "Email or Phone not found",
        verified: false,
      });
    }

    if (password === client.password) {
      return res
        .status(200)
        .json({ message: "Valid password", verified: true, agent: client });
    }

    return res
      .status(200)
      .json({ message: "Invalid password", verified: false });
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: "There was an error", verified: false });
  }
});



//PATCH METHOD
router.patch("/:id", async (req, res) => {
  const agentId = req.params.id;
  try {
    const updateAgent = await newAgents.findByIdAndUpdate(agentId, req.body, {
      new: true,
    });
    res.json(updateAgent);
  } catch (e) {
    res.status(404).json({ message: "Service not found" });
  }
});

//Delete Method
router.delete("/:id", async (req, res) => {
  const agentId = req.params.id;
  try {
    const deletedagent = await newAgents.findByIdAndRemove(agentId);
    res.json(deletedagent);
  } catch (error) {
    res.status(404).json({ message: "Service not found" });
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (req.file) {
      // here for testing use localy backend path http://localhost:5000
      const publicUrl = `http://localhost:5000/public/uploads/${req.file.originalname}`;
       
      const imageData = new newAgents({
        filename: req.file.originalname,
        path: req.file.path,
        profilePic: publicUrl,
        fullName: req.body.fullName,
        email: req.body.email,
        contactNumber: req.body.contactNumber,
        dateOfBirth: req.body.dateOfBirth,
        address: req.body.address,
        password : req.body.password,
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

// PATCH route for updating profile picture only
router.patch('/:id/profilepic', upload.single('image'), async (req, res) => {
  try {
    const agentId = req.params.id;
    const existingAgent = await newAgents.findById(agentId);

    if (!existingAgent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    if (req.file) {
      // Update profile picture only
      const publicUrl = `http://localhost:5000/public/uploads/${req.file.originalname}`;
      existingAgent.profilePic = publicUrl;
      await existingAgent.save();

      return res.status(200).json(existingAgent);
    } else {
      return res.status(400).json({ error: 'No file uploaded for profile picture update' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

