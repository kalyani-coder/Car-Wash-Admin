const express = require("express");
const Agents = require("../models/agents");
const router = express.Router();

router.post("/addAgent", (req, res) => {
  const { name, contactNumber, email, dob, profilepic } = req.body;

  const newAgent = new Agents({
    name,
    contactNumber,
    email,
    dob,
    profilepic,
  });

  try {
    newAgent.save();
  } catch (err) {
    console.log(err);
  }
  res.status(201).json({ message: "Agent added successfully" });
});

router.get("/", async (req, res, next) => {
  try {
    const agents = await Agents.find().exec();
    res.status(200).json(agents.map((agent) => agent.toObject()));
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/deleteAgent/:agentId", async (req, res) => {
  const { agentId } = req.params;
  try {
    await Agents.findByIdAndDelete(agentId);
    res.status(200).json({ message: "Agent deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.patch("/updateAgent/:agentId", async (req, res) => {
  const { agentId } = req.params;
  const { name, contactNumber, email } = req.body;

  try {
    await Agents.findByIdAndUpdate(agentId, {
      name,
      contactNumber,
      email,
    });
    res.status(200).json({ message: "Agent updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
