import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CarList from "./components/CarList";
import ModelList from "./components/ModelList";

const App = () => {
  return (
    <div className="min-h-screen bg-black text-cyan p-4">
      <header className="text-center text-2x1 font-bold p-4">
        Car Management
      </header>
      <main className="max-w-4x1 mx-auto p-6 rounded-lg bg-gray-90 shadow-lg">
        <Router>
          <Routes>
            <Route path="/cars" element={<CarList />} />
            <Route path="/models" element={<ModelList />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
};
export default App;
