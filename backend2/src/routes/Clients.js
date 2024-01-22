const express = require("express");
const router = express.Router();
const Client = require("../models/ClientModel"); // Adjust the path as needed

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

// Page: Get all clients
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:field/:value", async (req, res) => {
  const field = req.params.field;
  const value = req.params.value.replace("_", " ");
  if (value && field) {
    try {
      const bookings = await Client.find({ [field]: value });
      res.json(bookings);
    } catch (e) {
      res.status(400).json({ message: "Bad request" });
    }
  } else {
    res.status(400).json({ message: "Bad request" });
  }
});

// Assuming your route is something like /api/login
// Assuming your route is /api/login
router.post("/api/login", async (req, res) => {
  // console.log("Received login request");
  const { clientPhone } = req.body;

  try {
    // console.log("Trying to find client");

    // Check if the provided clientPhone exists in the database
    const client = await Client.findOne({ clientPhone: parseInt(clientPhone) });

    // console.log("Found Client:", client);

    if (!client) {
      // console.log("Client not found");
      return res.status(400).json({ message: "User not found. Please sign up.", verified: false });
    }

    // Include the user details in the success response
    const userResponse = {
      message: "Successful login",
      verified: true,
      userId: client._id,
      clientName: client.clientName,
    };

    // Log the entire response
    // console.log("Full Response:", userResponse);

    res.status(200).json(userResponse);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error", verified: false });
  }
});




// Page: Create a new client
// router.post("/", async (req, res) => {
//   try {
//     const newClient = new Client(req.body);
//     await newClient.save();
//     res.status(201).json(newClient);
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// router.post("/clients", async (req, res) => {
//   try {
//     const { clientPhone } = req.body;

//     // Check if a client with the same phone number already exists
//     const existingClient = await Client.findOne({ clientPhone });

//     if (existingClient) {
//       // If a client with the same phone number exists, send a response with an error message
//       return res.status(400).json({ error: 'Phone number already registered. Please log in.' });
//     }

//     // If no existing client with the same phone number, proceed to create a new client
//     const newClient = new Client(req.body);
//     await newClient.save();

//     res.status(201).json(newClient);
//   } catch (error) {
//     console.error('Error creating client:', error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });


// previous route 

// router.post("/", async (req, res) => {
//   try {
//     const { clientName, clientEmail, clientPhone, clientAddress } = req.body;

//     // Validate required fields
//     if (!clientName || !clientEmail || !clientPhone || !clientAddress) {
//       return res.status(400).json({ error: 'Missing required fields.' });
//     }

//     // Check if a client with the same phone number already exists
//     const existingClient = await Client.findOne({ clientPhone });

//     if (existingClient) {
//       // If a client with the same phone number exists, send a response with an error message
//       return res.status(400).json({ error: 'Phone number already registered. Please log in.' });
//     }

//     // If no existing client with the same phone number, proceed to create a new client
//     const newClient = new Client({
//       clientName,
//       clientEmail,
//       clientPhone,
//       clientAddress
//     });
    
//     await newClient.save();

//     res.status(201).json(newClient);
//   } catch (error) {
//     console.error('Error creating client:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// router.post('/', upload.single('image'), async (req, res) => {
//   try {
//     if (req.file) {
//       // here for testing use localy backend path http://localhost:8000
//       const publicUrl = `http://localhost:8000/public/uploads/${req.file.originalname}`;
       
//       const imageData = new Client({
//         filename: req.file.originalname,
//         path: req.file.path,
//         profilePic: publicUrl,
//         clientName: req.body.clientName,
//         clientEmail : req.body.clientEmail,
//         clientPhone : req.body.clientPhone,
//         clientAddress : req.body.clientAddress,
       
//       });

//       await imageData.save();
//       res.status(201).json(imageData);
//     } else {
//       res.status(400).json({ error: 'No file uploaded' });
//     }
//   } catch (e) {
//     res.status(500).json({ message: "Internal server error"});
//   }
// });



router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { clientName, clientEmail, clientPhone, clientAddress } = req.body;

    // Validation: Check if a client with the same phone number already exists
    const existingClient = await Client.findOne({ clientPhone });
    if (existingClient) {
      return res.status(400).json({ error: 'Phone number already registered. Please log in.' });
    }

    // Validation: Check if all required fields are provided
    if (!clientName || !clientEmail || !clientPhone || !clientAddress) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    if (req.file) {
      // here for testing use locally backend path http://localhost:8000
      const publicUrl = `http://localhost:8000/public/uploads/${req.file.originalname}`;

      const imageData = new Client({
        filename: req.file.originalname,
        path: req.file.path,
        profilePic: publicUrl,
        clientName,
        clientEmail,
        clientPhone,
        clientAddress,
      });

      await imageData.save();
      res.status(201).json(imageData);
    } else {
      res.status(400).json({ error: 'No file uploaded' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Page: Update a client by ID
router.patch("/:id", async (req, res) => {
  const clientId = req.params.id;
  try {
    const updatedClient = await Client.findByIdAndUpdate(clientId, req.body, {
      new: true,
    });
    res.json(updatedClient);
  } catch (error) {
    res.status(404).json({ message: "Client not found" });
  }
});

// Page: Delete a client by ID
router.delete("/:id", async (req, res) => {
  const clientId = req.params.id;
  try {
    const deletedClient = await Client.findByIdAndRemove(clientId);
    res.json(deletedClient);
  } catch (error) {
    res.status(404).json({ message: "Client not found" });
  }
});

// get by id

router.get("/:id", async (req, res) => {
  const clientId = req.params.id;

  try {
    const newClient = await Client.findById(clientId);
    if (!newClient) {
      return res.status(404).json({ message: "Client not Found" });
    }
    res.json(newClient);
  } catch (e) {
    res
      .status(404)
      .json({ message: "Client by id not found Internal server error" });
  }
});

module.exports = router;
