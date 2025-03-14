import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PIBTablePage from "./pages/PIBTablePage";
import "./index.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/table" element={<PIBTablePage />} />
      </Routes>
    </Router>
  );
};

export default App;
