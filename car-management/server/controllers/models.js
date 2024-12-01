const mongoose = require("mongoose");
const Model = require("../models/model");
const Car = require("../models/car");

// Get all models
const getAllModels = async (req, res) => {
  try {
    const models = await Model.find().populate("car"); // Populate car details
    res.status(200).json(models);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a model by ID
const getModelById = async (req, res) => {
  try {
    const model = await Model.findById(req.params.id).populate("car");
    if (!model) {
      return res.status(404).json({ error: "Model not found" });
    }
    res.status(200).json(model);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new model
const createModel = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // testing

    const { name, manufacturer, category, carId } = req.body;

    // Validate required fields
    if (!name || !manufacturer || !category || !carId) {
      console.log("Missing required fields");

      return res.status(400).json({ error: "All fields are required." });
    }

    if (!mongoose.Types.ObjectId.isValid(carId)) {
      console.log("Invalid Car ID format");

      return res.status(400).json({ error: "Invalid car ID format." });
    }

    const parentCar = await Car.findById(carId);
    console.log("Parent Car Found:", parentCar);

    if (!parentCar) {
      return res.status(404).json({ error: "Car not found." });
    }

    // Create and save new model
    const newModel = await Model.create({
      name,
      manufacturer,
      category,
      car: carId, // Associate the model with the car
    });

    // Add the model to the car's models array
    parentCar.models.push(newModel._id);
    await parentCar.save();

    res.status(201).json(newModel);
  } catch (err) {
    console.error("Error:", err.message);

    res.status(500).json({ error: err.message });
  }
};

// Update a model by ID
const updateModel = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, manufacturer, category, carId } = req.body;

    // Find and update the model
    const updatedModel = await Model.findByIdAndUpdate(
      id,
      { name, manufacturer, category, carId },
      { new: true, runValidators: true } // Return the updated model and validate inputs
    );

    if (!updatedModel) {
      return res.status(404).json({ error: "Model not found" });
    }

    res.status(200).json(updatedModel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a model by ID
const deleteModel = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the model
    const deletedModel = await Model.findByIdAndDelete(id);
    if (!deletedModel) {
      return res.status(404).json({ error: "Model not found" });
    }

    // Remove the model from the parent car's models array
    const parentCar = await Car.findById(deletedModel.car);
    if (parentCar) {
      parentCar.models = parentCar.models.filter(
        (modelId) => modelId.toString() !== deletedModel._id.toString()
      );
      await parentCar.save();
    }

    res.status(200).json({ message: "Model deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Export all functions
module.exports = {
  getAllModels,
  getModelById,
  createModel,
  updateModel,
  deleteModel,
};
