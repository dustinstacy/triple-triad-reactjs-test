import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CardsProvider } from "../context/CardLibraryContext";
import styled from "styled-components";
import Filter from "../components/Filter";
import { useState } from "react";
import CardLibraryList from "../components/CardLibraryList";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/Navbar";

const queryClient = new QueryClient();

export default function CardLibrary() {
  const [activeFilters, setActiveFilters] = useState(null);

  return (
    <QueryClientProvider client={queryClient}>
      <CardsProvider>
        <Background>
          <PageContainer>
            <Navbar />
            <SearchBar />
            <Filter activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
            <CardLibraryList activeFilters={activeFilters} />
          </PageContainer>
        </Background>
      </CardsProvider>
    </QueryClientProvider>
  );
}

const Background = styled.div`
  min-height: 100%;
  min-width: 100%;
  background-image: url("./images/canvas2.png");
  background-attachment: fixed;
  background-size: cover;
  position: absolute;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
