import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import Setup from "./pages/Setup";
import Match from "./pages/Match";
import MatchEnd from "./pages/MatchEnd";
import DevEnv from "./pages/DevEnv";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/Setup" element={<Setup />} />
      <Route path="/Match" element={<Match />} />
      <Route path="/MatchEnd" element={<MatchEnd />} />
      <Route path="/DevEnv" element={<DevEnv />} />
    </Routes>
  );
}
