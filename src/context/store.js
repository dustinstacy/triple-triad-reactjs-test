import React, { useEffect, useContext, createContext, useReducer, useCallback, useMemo } from "react";

const CardsContext = createContext({});

export function useCards() {
  return useCards(CardsContext);
}

function useCardsSource(user) {
  const [{ cards, search }, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "setCards":
          return { ...state, cards: action.payload };
        case "setSearch":
          return { ...state, search: action.payload };
        default:
          return "";
      }
    },
    { cards: [], search: "" }
  );

  useEffect(() => {
    if (user !== null) {
      fetch(`/${user.id}.json`)
        .then((response) => response.json())
        .then((data) => dispatch({ type: "setCards", payload: data }));
    } else {
      fetch(`/demo.json`)
        .then((response) => response.json())
        .then((data) => dispatch({ type: "setCards", payload: data }));
    }
  }, [user]);

  const setSearch = useCallback((search) => {
    dispatch({ type: "setSearch", payload: search });
  }, []);

  const filteredCards = useMemo(() => cards.filter((p) => p.name.toLowerCase().includes(search)), [cards, search]);

  return { cards: filteredCards, search, setSearch };
}

export function CardsProvider({ children }) {
  return <CardsContext.Provider value={useCardsSource()}>{children}</CardsContext.Provider>;
}
