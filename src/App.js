import React from "react";
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import Setup from "./pages/Setup";
import Match from "./pages/Match";
import MatchEnd from './pages/MatchEnd';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/Start" element={<Start />} />
        <Route path="/Setup" element={<Setup />} />
        <Route path="/Match" element={<Match />} />
        <Route path="/MatchEnd" element={<MatchEnd />} />
      </Routes>
    </Router>
  );
}

export default App;
