const Car = require("../models/car"); // Assuming the Car schema is in models/car.js

// Get all cars
const getAllCars = async (req, res) => {
  try {
    const cars = await Car.find(); // Fetch all cars from the database
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a car by ID
const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id); // Find a car by its ID
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.status(200).json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new car
const createCar = async (req, res) => {
  try {
    const { name, country, yearEstablished } = req.body;

    // Validate fields
    if (!name || !country || !yearEstablished) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Create a new car document
    const newCar = await Car.create({ name, country, yearEstablished });
    res.status(201).json(newCar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a car by ID
const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, country, yearEstablished } = req.body;

    const updatedCar = await Car.findByIdAndUpdate(
      id,
      { name, country, yearEstablished },
      { new: true, runValidators: true } // Return the updated car and validate inputs
    );

    if (!updatedCar) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.status(200).json(updatedCar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a car by ID
const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCar = await Car.findByIdAndDelete(id);
    if (!deletedCar) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.status(200).json({ message: "Car deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
};
