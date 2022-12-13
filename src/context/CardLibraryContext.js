import { useQuery } from "@tanstack/react-query";
import React, { useContext, createContext, useReducer, useCallback, useMemo } from "react";

const CardLibraryContext = createContext({});

export function useCards() {
  return useContext(CardLibraryContext);
}

function useCardsSource() {
  const { data: cards } = useQuery(["cards"], () => fetch("/card-data.json").then((res) => res.json()), {
    initialData: [],
  });

  console.log(cards);

  const [{ search }, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "setSearch":
          return { ...state, search: action.payload };
        default:
          return "";
      }
    },
    { search: "" }
  );

  const setSearch = useCallback((search) => {
    dispatch({ type: "setSearch", payload: search });
  }, []);

  const filteredCards = useMemo(
    () => cards.filter((card) => card.name.toLowerCase().includes(search.toLowerCase())),
    [cards, search]
  );

  return { cards: filteredCards, search, setSearch };
}

export function CardsProvider({ children }) {
  return <CardLibraryContext.Provider value={useCardsSource()}>{children}</CardLibraryContext.Provider>;
}
