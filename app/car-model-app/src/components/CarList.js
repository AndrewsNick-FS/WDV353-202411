import React, { useState, useEffect } from "react";
import axios from "axios";

const CarList = () => {
  const [cars, setCars] = useState([]);

  // Fetch cars from the backend
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:3000/cars");
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  // Delete a car
  const deleteCar = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/cars/${id}`);
      setCars(cars.filter((car) => car._id !== id)); // Update state
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  return (
    <div className="car-list">
      <h2 className="text-cyan-500 font-bold mb-4">Car List</h2>
      <ul className="list-disc list-inside bg-black text-cyan-300 rounded p-4">
        {cars.map((car) => (
          <li key={car._id} className="mb-2">
            <span className="font-semibold">{car.name}</span> - {car.country} (
            {car.yearEstablished})
            <div className="mt-2">
              <button
                className="bg-cyan-500 text-black px-2 py-1 rounded mr-2"
                onClick={() => alert("Redirect to edit form")}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => deleteCar(car._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
