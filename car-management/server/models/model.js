const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., Corolla, Mustang
  manufacturer: { type: String, required: true }, // e.g., Sedan, SUV
  category: { type: String, required: true }, // e.g., Sedan, SUV
  car: { type: mongoose.Schema.Types.ObjectId, ref: "Car" }, // Reference to the Car
});

module.exports = mongoose.model("Model", modelSchema);
