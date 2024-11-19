const Car = require("../models/car");

// Get all cars
exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find().populate("models");
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get car by ID
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate("models");
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new car
exports.createCar = async (req, res) => {
  try {
    const { name, country, yearEstablished } = req.body;
    const car = new Car({ name, country, yearEstablished });
    const savedCar = await car.save();
    res.status(201).json(savedCar);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update car by ID
exports.updateCar = async (req, res) => {
  try {
    const { name, country, yearEstablished } = req.body;
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { name, country, yearEstablished },
      { new: true, runValidators: true } // Returns updated car
    );
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.status(200).json(car);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete car by ID
exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ message: "Car not found" });
    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
