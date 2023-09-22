// const express = require("express");
// const router = express.Router();
// const newAgents = require("../models/AgentsModel");

// // GET METHOD
// router.get("/", async (req, res) => {
//   try {
//     const agents = await newAgents.find();
//     res.json(agents);
//   } catch (e) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// router.get("/:field/:value", async (req, res) => {
//   const field = req.params.field;
//   const value = req.params.value.replace("_", " ");
//   if (value && field) {
//     try {
//       const bookings = await newAgents.find({ [field]: value });
//       res.json(bookings);
//     } catch (e) {
//       res.status(400).json({ message: "Bad request" });
//     }
//   } else {
//     res.status(400).json({ message: "Bad request" });
//   }
// });
// // GET BY ID

// router.get("/:id", async (req, res) => {
//   const agentId = req.params.id;
//   try {
//     const agent = await newAgents.findById(agentId);
//     if (!agent) {
//       return res.status(404).json({ message: "Agent not found" });
//     }
//     res.json(agent);
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// // POST METHOD

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
// // POST Method for agent login
// // router.post("/login", async (req, res) => {
// //   try {
// //       const contactNumber = req.body.contactNumber;
// //       const agent = await newAgents.findOne({ contactNumber: contactNumber });

// //       if (!agent) {
// //           return res.status(401).json({ message: 'Invalid contact number' });
// //       }

// //       // You can add additional authentication logic here if needed

// //       res.json({ message: 'Login successful', agent: agent });
// //   } catch (e) {
// //       console.error(e);
// //       res.status(500).json({ message: "Internal server error" });
// //   }
// // });

// //PATCH METHOD
// router.patch("/:id", async (req, res) => {
//   const agentId = req.params.id;
//   try {
//     const updateAgent = await newAgents.findByIdAndUpdate(agentId, req.body, {
//       new: true,
//     });
//     res.json(updateAgent);
//   } catch (e) {
//     res.status(404).json({ message: "Service not found" });
//   }
// });

// //Delete Method
// router.delete("/:id", async (req, res) => {
//   const agentId = req.params.id;
//   try {
//     const deletedagent = await newAgents.findByIdAndRemove(agentId);
//     res.json(deletedagent);
//   } catch (error) {
//     res.status(404).json({ message: "Service not found" });
//   }
// });

// module.exports = router;



// new code by developer 
const express = require("express");
const router = express.Router();
const newAgents = require("../models/AgentsModel");
// const AgentsLogin = require("../models/AgentsLoginModel");

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

router.post("/", async (req, res) => {
  try {
    const newagents = new newAgents(req.body);
    await newagents.save();
    res.status(201).json(newagents);
  } catch (e) {
    console.error(e); // Log the error to the console
    res.status(500).json({ message: "Internal server error" });
  }
});

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

// router.post("/login", async (req, res) => {
//   try {
//       const contactNumber = req.body.contactNumber;
//       const agent = await newAgents.findOne({ contactNumber: contactNumber });

//       if (!agent) {
//           return res.status(401).json({ message: 'Invalid contact number' });
//       }

//       // You can add additional authentication logic here if needed

//       res.json({ message: 'Login successful', agent: agent });
//   } catch (e) {
//       console.error(e);
//       res.status(500).json({ message: "Internal server error" });
//   }
// });

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

module.exports = router;

