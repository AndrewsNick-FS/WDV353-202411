import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CarList from "./components/CarList";
import ModelList from "./components/ModelList";

const App = () => {
  <Router>
    <Routes>
      <Route path="/cars" element={<CarList />} />
      <Route path="/models" element={<ModelList />} />
    </Routes>
  </Router>;
};

export default App;
