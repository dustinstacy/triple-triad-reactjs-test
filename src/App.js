import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import Setup from "./pages/Setup";
import Match from "./pages/Match";
import MatchEnd from "./pages/MatchEnd";
import DevEnv from "./pages/DevEnv";
import CardLibrary from "./pages/CardLibrary";
import { CardsProvider } from "./context/DemoCardsContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CardsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Start />} />
            <Route path="/Setup" element={<Setup />} />
            <Route path="/Match" element={<Match />} />
            <Route path="/MatchEnd" element={<MatchEnd />} />
            <Route path="/DevEnv" element={<DevEnv />} />
            <Route path="/CardLibrary" element={<CardLibrary />} />
          </Routes>
        </BrowserRouter>
      </CardsProvider>
    </QueryClientProvider>
  );
}
