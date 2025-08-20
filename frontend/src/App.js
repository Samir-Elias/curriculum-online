import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Resume from "./components/Resume";
import "./styles/enhanced-styles.css"; 

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Resume />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;