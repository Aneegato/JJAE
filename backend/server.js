const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const openaiRouter = require("./src/routes/openaiRoutes");


const app = express();
const port = process.env.PORT || 3001; 

app.use(bodyParser.json());

app.use(cors());

app.use("/api", openaiRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});