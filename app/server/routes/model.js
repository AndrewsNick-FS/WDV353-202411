const express = require("express");
const {
  getAllModels,
  getModelById,
  createModel,
  updateModel,
  deleteModel,
} = require("../controllers/models");

const router = express.Router();

// Routes for Model CRUD
router.get("/", getAllModels); // Get all models
router.get("/:id", getModelById); // Get model by ID
router.post("/", createModel); // Create a new model
router.put("/:id", updateModel); // Update model by ID
router.delete("/:id", deleteModel); // Delete model by ID

module.exports = router;
