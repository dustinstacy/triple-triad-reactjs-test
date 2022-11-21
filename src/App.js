import React from "react";
import "./App.css";
// import Navbar from './components/Navbar/Navbar';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import Setup from "./pages/Setup";
import Match from "./pages/Match";
import MatchEnd from "./pages/MatchEnd";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/Setup" element={<Setup />} />
        <Route path="/Match" element={<Match />} />
        <Route path="/MatchEnd" element={<MatchEnd />} />
      </Routes>
    </Router>
  );
}
