const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routeGeneratorRouter = require("./src/routes/routeGenerator");


const app = express();
const port = process.env.PORT || 3001; 

app.use(bodyParser.json());

app.use(cors());

app.use("/api", routeGeneratorRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});