import React, { useState, useEffect } from "react";
import api from "../services/api";

const CarForm = () => {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({
    name: "",
    country: "",
    yearEstablished: "",
  });

  // Fetch all cars
  useEffect(() => {
    api
      .get("/cars")
      .then((response) => setCars(response.data))
      .catch((err) => console.error(err));
  }, []);

  // Add a new car
  const handleAddCar = () => {
    api
      .post("/cars", newCar)
      .then((response) => {
        setCars([...cars, response.data]);
        setNewCar({ name: "", country: "", yearEstablished: "" }); // Form reset
      })
      .catch((err) => console.error(err));
  };

  // Delete a car
  const handleDeleteCar = (id) => {
    api
      .delete(`/cars/${id}`)
      .then(() => setCars(cars.filter((car) => car._id !== id)))
      .catch((err) => console.error(err));
  };

  return (
    <div className="bg-cyan-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-x1 font-semibold mb-4">Cars</h2>
      {/* List of Cars */}
      <ul>
        {cars.map((car) => (
          <li key={car._id} className="mb-2 flex justify-between items-center">
            {car.name} ({car.country}, {car.yearEstablished})
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => handleDeleteCar(car._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {/* Add New Car */}
      <div className="mt-4">
        <h3>Add New Car</h3>
        <input
          className="block mb-2 p-2 rounded border"
          placeholder="Name"
          value={newCar.name}
          onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
        />
        <input
          className="block mb-2 p-2 rounded border"
          placeholder="Country"
          value={newCar.country}
          onChange={(e) => setNewCar({ ...newCar, country: e.target.value })}
        />
        <input
          className="blco mb-2 p-2 rounded border"
          placeholder="Year Established"
          value={newCar.yearEstablished}
          onChange={(e) =>
            setNewCar({ ...newCar, yearEstablished: e.target.value })
          }
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleAddCar}
        >
          Add Car
        </button>
      </div>
    </div>
  );
};

export default CarForm;
