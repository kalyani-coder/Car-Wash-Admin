
const express = require('express')
const router = express.Router()
const AgentLogin = require('../models/AgentLoginModel')


// GET METHOD
router.get( "/" , async (req, res) => {
    try{

        const agents = await AgentLogin.find()
        res.json(agents)
    } catch(e){
        res.status(500).json({message : "Internal Server Error"})
    }
})

// POST METHOD

router.post("/", async (req, res) => {
    try {
        const newagents = new AgentLogin(req.body)
        await newagents.save()
        res.status(201).json(newagents)
    } catch (e) {
        console.error(e); // Log the error to the console
        res.status(500).json({ message: "Internal server error" })
    }
})

//PATCH METHOD
router.patch("/:id" , async (req, res) => {
    const agentId = req.params.id
    try{
        const updateAgent = await AgentLogin.findByIdAndUpdate(agentId, req.body, {
            new: true
        });
        res.json(updateAgent)
    }catch(e){
        res.status(404).json({ message: 'Service not found' });
    }
})

//Delete Method 
router.delete('/:id', async (req, res) => {
    const agentId = req.params.id;
    try {
      const deletedagent = await AgentLogin.findByIdAndRemove(agentId);
      res.json(deletedagent);
    } catch (error) {
      res.status(404).json({ message: 'Service not found' });
    }
  });


module.exports = router
