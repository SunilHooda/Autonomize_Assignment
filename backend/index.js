const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);
app.use(express.json());
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Connected to Database");
    console.log(`Server is running at ${PORT}`);
  });
});
