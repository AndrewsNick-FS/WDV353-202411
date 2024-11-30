import React, { useState, useEffect } from "react";
import axios from "axios";

const ModelList = () => {
  const [models, setModels] = useState([]);

  // Fetch models from the backemd
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get("http://localhost:3000/models");
        setModels(response.data);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };
    fetchModels();
  }, []);

  // Delete a model
  const deleteModel = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/models/${id}`);
      setModels(models.filter((model) => model._id !== id));
    } catch (error) {
      console.error("Error deletingf model:", error);
    }
  };
  return (
    <div className="model-list">
      <h2 className="text-cyan-500 font-bold mb-4">Model List</h2>
      <ul className="list-disc list-inside bg-black text-cyan-300 rounded p-4">
        {models.map((model) => (
          <li key={model._id} className="mb-2">
            <span className="font-semibold">{model.name}</span> - {model.type}{" "}
            (${model.price})<small> | Car: {model.car.name}</small>
            <div className="mt-2">
              <button
                className="bg-cyan-500 text-black px-2 py-1 rounded mr-2"
                onClick={() => alert("Redirect to edit form")}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => deleteModel(model._id)}
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

export default ModelList;
