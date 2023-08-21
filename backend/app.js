const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors")
const app = express();
const port = 5000;


const ClientRoute = require("./routes/clients-routes");
const ServiceRoute = require("./routes/services-routes");
const PromotionRoute = require("./routes/promotions-routes");
const TopServicesRoute = require("./routes/top-services-routes");
const AgentsRoute = require("./routes/agents-routes");

app.use(bodyParser.json());
app.use(cors())

app.use("/api/clients", ClientRoute);

app.use("/api/services", ServiceRoute);

app.use("/api/promotions", PromotionRoute);

app.use("/api/top-services", TopServicesRoute);

app.use("/api/agents", AgentsRoute);

mongoose
  .connect(
    "mongodb+srv://ADMIN:ADMIN@cluster0.6hrtdcu.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
