const express = require("express");
const {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
} = require("../controllers/cars");

const router = express.Router();

// Routes for Car CRUD
router.get("/", getAllCars); // Get all cars
router.get("/:id", getCarById); // Get car by ID
router.post("/", createCar); // Create new car
router.put("/:id", updateCar); // Update car by ID
router.delete("/:id", deleteCar); // Delete car by ID

module.exports = router;
