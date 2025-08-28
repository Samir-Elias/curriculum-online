import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Resume from "./components/Resume";
import LinkedInBadge from './components/LinkedBadge'; // Corregida la ruta

function App() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoadingComplete(true);
  };

  return (
    <div className="App">
      {/* LinkedInBadge solo aparece después de que termine la carga */}
      {isLoadingComplete && <LinkedInBadge />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Resume onAppLoadingComplete={handleLoadingComplete} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;