const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., Toyota, Ford
  country: { type: String, required: true }, // e.g., Japan, USA
  yearEstablished: { type: Number, required: true }, // e.g., 1937
  models: [{ type: mongoose.Schema.Types.ObjectId, ref: "Model" }], // Relationship to Model
});

module.exports = mongoose.model("Car", carSchema);
