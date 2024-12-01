const express = require("express");
const app = express();
const cors = require("cors");

// Import route files
const carRoutes = require("./routes/cars");
const modelRoutes = require("./routes/model");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routes
app.use("/cars", carRoutes);
app.use("/models", modelRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.log("Request Body Middleware:", req.body);

  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;
