import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Resume from "./components/Resume";
import LinkedInBadge from './components/LinkedinBadge'; // Corregida la ruta
function App() {
  return (
    <div className="App">
      <LinkedInBadge /> {/* Removido personalInfo por ahora */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Resume />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;