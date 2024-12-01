const express = require("express");
const app = express();
const cors = require("cors");

// Import route files
const carRoutes = require("./routes/cars");
const modelRoutes = require("./routes/model");

app.use(express.json());
app.use(cors());
// Mount routes
app.use("/cars", carRoutes);
app.use("/models", modelRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;
