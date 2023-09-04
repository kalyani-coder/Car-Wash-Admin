const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer'); // Import multer

const app = express();
// const port = process.env.PORT || 9000;
const port = 9000

// Middleware to parse JSON request bodies
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());

// Define storage and file size limit
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Adjust the limit as needed (e.g., 10MB)
  fileFilter: (req, file, cb) => {
    // Check if the file's MIME type is one of the allowed image types
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
      cb(null, true); // Accept the file
    } else {
      cb(new Error('File format not supported')); // Reject the file
    }
  },
});

// MongoDB connection setup

mongoose.connect('mongodb+srv://vedantassignment05:X3OrOGJ7kDg5Ze32@carwash.qinnywx.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Import and use route files
const servicesRouter = require('./routes/Services');
const clientsRouter = require('./routes/Clients');
const promotionsRouter = require('./routes/Promotion');
const agentRouter = require('./routes/Ajents');
const newAgentRouter = require('./routes/Agents')
const topServices = require('./routes/TopServices')
const booking = require('./routes/Booking')
const orderassign = require('./routes/AssignOrder');
const agentlogin = require('./routes/AgentLogin')

app.use('/api/services',  servicesRouter);
app.use('/api/clients', clientsRouter);
app.use('/api/promotions', promotionsRouter);
app.use('/api/agent', upload.single('file'), agentRouter); // Use multer middleware for agentRouter
app.use("/api/agents", newAgentRouter)
app.use("/api/topservices" , topServices)
app.use("/api/booking" , booking)
app.use("/api/orderassign" , orderassign)
app.use("/api/agentlogin" , agentlogin)



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
