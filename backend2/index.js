const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
// const multer = require('multer'); // Import multer

const app = express();
// const port = process.env.PORT || 9000;
const port = process.env.PORT || 8000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());


// MongoDB connection setup

mongoose.connect('mongodb+srv://vedantassignment05:X3OrOGJ7kDg5Ze32@carwash.qinnywx.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const apiRouter = express.Router();
// Import and use route files
const servicesRouter = require('./src/routes/Services');
const clientsRouter = require('./src/routes/Clients');
const promotionsRouter = require('./src/routes/Promotion');

// app.use('/api/services',  servicesRouter);
// app.use('/api/clients', clientsRouter);
// app.use('/api/promotions', promotionsRouter);
apiRouter.use('/services', servicesRouter);
apiRouter.use('/clients', clientsRouter);
apiRouter.use('/promotions', promotionsRouter);


app.use('/api' , apiRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
