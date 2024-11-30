import React, { useState, useEffect } from "react";
import axios from "axios";

const ModelForm = ({ refreshModels }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    price: "",
    car: "", // Car ID
  });

  const [cars, setCars] = useState([]);

  // Fetch available cars for dropdown
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("http://localhost:5001/cars");
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  //   Handdle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form Submition
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/models", formData);
      setFormData({ name: "", type: "", price: "", car: "" }); //Form reset
      refreshModels(); // Update Parent Component
    } catch (error) {
      console.error("Error creating model:", error);
    }
  };

  return (
    <form
      className="bg-black text-cyan-300 rounded p-4 shadow-md"
      onSubmit={handleSubmit}
    >
      <h2 className="text-cyan-500 font-bold mb-4">Add a Model</h2>
      <label className="block mb-2">
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-2 py-1 rounded"
          required
        />
      </label>
      <label className="block mb-2">
        Type:
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full px-2 py-1 rounded"
          required
        />
      </label>
      <label className="block mb-2">
        Price:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full px-2 py-1 rounded"
          required
        />
      </label>
      <label className="block mb-2">
        Associated Car:
        <select
          name="car"
          value={formData.car}
          onChange={handleChange}
          className="w-full px-2 py-1 rounded"
          required
        >
          <option value="">Select a Car</option>
          {cars.map((car) => (
            <option key={car._id} value={car._id}>
              {car.name}
            </option>
          ))}
        </select>
      </label>
      <button
        type="sumbit"
        className="bg-cyan-500 text-black px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default ModelForm;
