const Model = require("../models/Model");

exports.getAllModels = async (req, res) => {
  try {
    const models = await Model.find().populate("car");
    res.status(200).json(models);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getModelById = async (req, res) => {
  try {
    const model = await Model.findById(req.params.id).populate("car");
    if (!model) return res.status(404).json({ message: "Model not found" });
    res.status(200).json(model);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
