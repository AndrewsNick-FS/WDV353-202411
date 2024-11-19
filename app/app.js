const express = require("express");
const app = express();

// Import route files
const carRoutes = require("./routes/cars");
const modelRoutes = require("./routes/model");

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Service is up");
});

// Mount routes
app.use("/cars", carRoutes);
app.use("/models", modelRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;
