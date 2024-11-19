const Model = require("../models/model");

// Get all models
exports.getAllModels = async (req, res) => {
  try {
    const models = await Model.find().populate("car");
    res.status(200).json(models);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get models by ID
exports.getModelById = async (req, res) => {
  try {
    const model = await Model.findById(req.params.id).populate("car");
    if (!model) return res.status(404).json({ message: "Model not found" });
    res.status(200).json(model);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new model
exports.createModel = async (req, res) => {
  try {
    const { name, type, price, car } = req.body;

    // Validate car ID
    const parentCar = await Car.findById(car);
    if (!parentCar) return res.status(404).json({ message: "Car not found" });

    const model = new Model({ name, type, price, car });
    const savedModel = await model.save();

    // Optionally, add model to the car's models array
    parentCar.models.push(savedModel._id);
    await parentCar.save();

    res.status(201).json(savedModel);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update model by ID
exports.updateModel = async (req, res) => {
  try {
    const { name, type, price, car } = req.body;
    const model = await Model.findByIdAndUpdate(
      req.params.id,
      { name, type, price, car },
      { new: true, runValidators: true }
    );
    if (!model) return res.status(404).json({ message: "Model not found" });
    res.status(200).json(model);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete model by ID
exports.deleteModel = async (req, res) => {
  try {
    const model = await Model.findByIdAndDelete(req.params.id);
    if (!model) return res.status(404).json({ message: "Model not found" });

    // Optionally, remove model from car's models array
    const parentCar = await Car.findById(model.car);
    if (parentCar) {
      parentCar.models = parentCar.models.filter(
        (id) => id.toString() !== model._id.toString()
      );
      await parentCar.save();
    }

    res.status(200).json({ message: "Model deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
