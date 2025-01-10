const express = require("express");
const cors = require("cors");

require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Connected to Database");
    console.log(`Server is running at ${PORT}`);
  });
});