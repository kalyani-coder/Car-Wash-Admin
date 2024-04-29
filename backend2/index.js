const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require('multer');
const app = express();
const port = process.env.PORT || 8000;
const Client = require("../backend2/src/models/ClientModel");


// Middleware to parse JSON request bodies
app.use(bodyParser.json({ limit: "10mb" }));
app.use(cors());
app.use('/public', express.static('public'));

// for storing image path 
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// MongoDB connection setup
mongoose.connect(
  // old DB String 
  // "mongodb+srv://vedantassignment05:X3OrOGJ7kDg5Ze32@carwash.qinnywx.mongodb.net/",

  // New DB String 
  "mongodb+srv://vedantassignment05:fex6n7xFpTlRBTr6@amarcarwash.xyadmes.mongodb.net/?retryWrites=true&w=majority&appName=amarcarwash",


  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const apiRouter = express.Router();

// Import and use route files
const servicesRouter = require("./src/routes/Services");
const topServicesRouter = require("./src/routes/TopServices");
const clientsRouter = require("./src/routes/Clients");
const promotionsRouter = require("./src/routes/Promotion");
const bookingRouter = require("./src/routes/Booking");
const assignOrderRouter = require("./src/routes/AssignOrder");
const agentRouter = require("./src/routes/Agents");
const notification = require("./src/routes/Notification");
const homeoffer = require("./src/routes/Homeoffers");
const addStocks = require("./src/routes/AddStocks");
const agentnotification = require("./src/routes/AgentNotification");
const reviews = require("./src/routes/Review");
const clientLocation = require("./src/routes/ClientLocation");
const agentLocation = require("./src/routes/AgentsLocation");
const adminlogin = require('./src/routes/AdminLogin')
const jobcard = require("./src/routes/JobCard")

const masterRoute = require("./src/routes/MasterRoute")

const NewMasterApi = require('./src/routes/NewMasterRoute')


apiRouter.use("/services", servicesRouter);
apiRouter.use("/topservices", topServicesRouter);
apiRouter.use("/clients", clientsRouter);
apiRouter.use("/promotions", promotionsRouter);
apiRouter.use("/bookings", bookingRouter);
apiRouter.use("/assignorders", assignOrderRouter);
apiRouter.use("/agents", agentRouter);
apiRouter.use("/notification", notification);
apiRouter.use("/homeoffers", homeoffer);
apiRouter.use("/stocks", addStocks);
apiRouter.use("/agentnotifications", agentnotification);
apiRouter.use("/reviews", reviews);
apiRouter.use("/clientlocation", clientLocation);
apiRouter.use("/agentlocation", agentLocation);
apiRouter.use("/adminlogin" , adminlogin);
apiRouter.use("/jobcard" , jobcard);
apiRouter.use("/master", masterRoute);
apiRouter.use("/newmaster", NewMasterApi);

app.post("/api/login", async (req, res) => {
  console.log("Received login request");
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
      clientEmail : client.clientEmail
    };

    // Log the entire response
    // console.log("Full Response:", userResponse);

    res.status(200).json(userResponse);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error", verified: false });
  }
});



// we are handle aur all api routes from here
app.use("/api", apiRouter);

// our server is running on port 8000  hosting running port 10000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
