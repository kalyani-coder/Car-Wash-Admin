const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require('multer');
const app = express();
const port = process.env.PORT || 8000;
require('dotenv').config();
const Client = require("./models/ClientModel");


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
mongoose.connect(process.env.MONGODB_URL)
.then(() => {
  console.log(`Database Connected Successfully`)
}).catch((e)=>{
    console.log(`Error ${e}`)
})




const apiRouter = express.Router();

// Import and use route files
const servicesRouter = require("./routes/Services");
const topServicesRouter = require("./routes/TopServices");
const clientsRouter = require("./routes/Clients");
const promotionsRouter = require("./routes/Promotion");
const bookingRouter = require("./routes/Booking");
const assignOrderRouter = require("./routes/AssignOrder");
const agentRouter = require("./routes/Agents");
const notification = require("./routes/Notification");
const homeoffer = require("./routes/Homeoffers");
const addStocks = require("./routes/AddStocks");
const agentnotification = require("./routes/AgentNotification");
const reviews = require("./routes/Review");
const clientLocation = require("./routes/ClientLocation");
const agentLocation = require("./routes/AgentsLocation");
// const adminlogin = require('./routes/AdminLogin')
const jobcard = require("./routes/JobCard")
const adminlogin = require("./routes/AdminLoginRoute")

const masterRoute = require("./routes/MasterRoute")

const NewMasterApi = require('./routes/NewMasterRoute')


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
apiRouter.use("/", adminlogin);
// apiRouter.use("/adminlogin" , adminlogin);
apiRouter.use("/jobcard" , jobcard);
apiRouter.use("/master", masterRoute);
apiRouter.use("/newmaster", NewMasterApi);

app.post("/api/login", async (req, res) => {
  console.log("Received login request");
  const { clientPhone } = req.body;

  try {

    const client = await Client.findOne({ clientPhone: parseInt(clientPhone) });
    if (!client) {
      return res.status(400).json({ message: "User not found. Please sign up.", verified: false });
    }

    const userResponse = {
      message: "Successful login",
      verified: true,
      userId: client._id,
      clientName: client.clientName,
      clientEmail : client.clientEmail
    };

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
  console.log(`Server is running on http://localhost:${port}`);
});
