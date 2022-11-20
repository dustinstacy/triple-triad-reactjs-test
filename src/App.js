import React from "react";
import './App.css';
import Navbar from './Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Setup from "./Setup";
import Match from "./Match";
import GameOver from './GameOver';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/Home" element={<Home />} />
        <Route path="/Setup" element={<Setup />} />
        <Route path="/Match" element={<Match />} />
        <Route path="/GameOver" element={<GameOver />} />
      </Routes>
    </Router>
  );
}

export default App;
