import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Emergency from "./pages/Emergency";
import Hospitaldetails from "./pages/Hospitaldetails";
import Aboutus from "./pages/Aboutus";
import Quiz from "./components/Quiz";
import AiDoctor from "./pages/AiDoctor";
import Confirmed from "./pages/Confirmed";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/emergency" element={<Emergency />} />
      <Route path="/Hospitaldetails" element={<Hospitaldetails />} />
      <Route path="/Aboutus" element={<Aboutus />} />
      <Route path="/Quiz" element={<Quiz />} />
      <Route path="/ai-doctor" element={<AiDoctor />} />
      <Route path="/Confirmed" element={<Confirmed />} />
    </Routes>
  );
}

export default App;
