const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., Corolla, Mustang
  type: { type: String, required: true }, // e.g., Sedan, SUV
  price: { type: Number, required: true }, // e.g., 25000
  car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true }, // Reference to Car
});

module.exports = mongoose.model("Model", modelSchema);
