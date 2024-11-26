const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  yearEstablished: { type: Number, required: true },
  models: [{ type: mongoose.Schema.Types.ObjectId, ref: "Model" }], // Relationship to Model
});

module.exports = mongoose.model("Car", carSchema);
