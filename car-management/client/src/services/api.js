import axios from "axios";

const API_BASE_URL = "http://localhost:5000/cars";

export const getAllCars = async () => axios.get(`${API_BASE_URL}/cars`);
export const getCarsById = async (id) =>
  axios.get(`${API_BASE_URL}/cars/${id}`);
export const createCar = async (data) =>
  axios.post(`${API_BASE_URL}/cars`, data);
export const updateCar = async (id, data) =>
  axios.put(`${API_BASE_URL}/cars/${id}`);
export const deleteCar = async (id) =>
  axios.delete(`${API_BASE_URL}/cars/${id}`);

export const getAllModels = async () => axios.get(`${API_BASE_URL}/models`);
export const getModelById = async (id) =>
  axios.get(`${API_BASE_URL}/models/${id}`);
export const createModel = async (data) =>
  axios.post(`${API_BASE_URL}/models`, data);
export const updateModel = async (id, data) =>
  axios.put(`${API_BASE_URL}/models/${id}`);
export const deleteModel = async (id) =>
  axios.delete(`${API_BASE_URL}/models/${id}`);
