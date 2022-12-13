import { useQuery } from "@tanstack/react-query";
import React, { useContext, createContext } from "react";

const P1CardsContext = createContext({});
const P2CardsContext = createContext({});

export function useP1Cards() {
  return useContext(P1CardsContext);
}

export function useP2Cards() {
  return useContext(P2CardsContext);
}

function useP1CardsSource() {
  const user = {
    name: "Player One",
    id: "playerOne",
  };

  const { data: p1cards } = useQuery(["cards"], () => fetch(`/${user.id}.json`).then((res) => res.json()), {
    initialData: [],
  });

  return { p1cards };
}

function useP2CardsSource() {
  // const user = {
  //   name: "Player Two",
  //   id: "playerTwo",
  // };

  const { data: p2cards } = useQuery(["cards"], () => fetch("/playerTwo.json").then((res) => res.json()), {
    initialData: [],
  });

  console.log(p2cards);

  return { p2cards };
}

export function OwnedCardsProvider({ children }) {
  return (
    <>
      <P1CardsContext.Provider value={useP1CardsSource()}>
        <P2CardsContext.Provider value={useP2CardsSource()}> {children}</P2CardsContext.Provider>
      </P1CardsContext.Provider>
      ;
    </>
  );
}
