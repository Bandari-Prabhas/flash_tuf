// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FlashcardViewer from "./pages/FlashcardViewer";
import Dashboard from "./pages/Dashboard";
import './index.css'; // Or wherever your Tailwind CSS file is located



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flashcard-viewer" element={<FlashcardViewer />} />
        <Route path="/admin-dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
