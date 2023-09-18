const express = require("express");
const router = express.Router();
const AssignOrder = require("../models/AssignOrdersModel");

router.get("/", async (req, res) => {
  try {
    const assignOrder = await AssignOrder.find();
    res.send(assignOrder);
  } catch (e) {
    res.status(404).json({ message: "Internal server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newAssignOrder = new AssignOrder(req.body);
    await newAssignOrder.save();
    res.status(201).json(newAssignOrder);
  } catch (e) {
    res.status(404).json(" Internal Server error");
  }
});

router.patch("/:id", async (req, res) => {
  const assignOrderId = req.params.id;

  try {
    const updatedOrder = await AssignOrder.findByIdAndUpdate(
      assignOrderId,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedOrder);
  } catch (e) {
    res.status(404).json({ message: "Order Not found" });
  }
});

router.delete("/:id", async (req, res) => {
  const assignOrderId = req.params.id;
  try {
    const deletedOrder = await AssignOrder.findByIdAndDelete(assignOrderId);
    res.json(deletedOrder);
  } catch (e) {
    res.status(404).json({ message: "Order not found" });
  }
});

// Get by ID
router.get("/:id", async (req, res) => {
  const assignOrderId = req.params.id;
  try {
    const assignOrder = await AssignOrder.findById(assignOrderId);
    if (!assignOrder) {
      return res.status(404).json({ message: "AssignOrder not found" });
    }
    res.json(assignOrder);
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.patch("/assignAgent/:id", async (req, res) => {
  const Orderid = req.params.id;
  const AgentId = req.body.AgentId;
  try {
    const updatedOrder = await AssignOrder.findByIdAndUpdate(
      Orderid,
      {
        $set: {
          agentId: AgentId,
        },
      },
      {
        new: true,
      }
    );
    res.json(updatedOrder);
  } catch (e) {
    res.status(500).json({ message: "Bad Request" });
  }
});

router.get("/:field/:value", async (req, res) => {
  const field = req.params.field;
  const value = req.params.value.replace("_", " ");
  if (value && field) {
    try {
      const bookings = await AssignOrder.find({ [field]: value });
      res.json(bookings);
    } catch (e) {
      res.status(400).json({ message: "Bad request" });
    }
  } else {
    res.status(400).json({ message: "Bad request" });
  }
});

// router.get("/byAgent/:id", async (req, res) => {
//   const AgentId = req.params.id;
//   try {
//     const orders = await AssignOrder.find({ agentId: AgentId });
//     res.json(orders);
//   } catch (e) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

module.exports = router;
