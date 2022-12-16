import { useQuery } from "@tanstack/react-query";
import React, { useContext, createContext } from "react";

const MAX_VALUE = 10;

const CardsContext = createContext({});

export function useCardsCtx() {
  return useContext(CardsContext);
}

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const common = randomIntFromInterval(8, 12);
const uncommon = randomIntFromInterval(13, 17);
const rare = randomIntFromInterval(18, 22);
const epic = randomIntFromInterval(23, 27);
const legendary = randomIntFromInterval(28, 32);

const randomizeValues = (rarity, max, len = 4) => {
  let startValues = new Array(len);
  let sum = 0;
  do {
    for (let i = 0; i < len; i++) {
      startValues[i] = Math.random();
    }
    sum = startValues.reduce((acc, val) => acc + val, 0);
    const scale = (rarity - len) / sum;
    startValues = startValues.map((val) => Math.min(max, Math.round(val * scale) + 1));
    sum = startValues.reduce((acc, val) => acc + val, 0);
  } while (sum - rarity);
  const values = startValues.map((value) => {
    if (value === 10) {
      return "A";
    }
    return value;
  });
  return values;
};

const assignRandomValues = (array) => {
  array.forEach((card) => {
    if (Object.values(card).includes("common")) {
      card.values = randomizeValues(common, MAX_VALUE);
    } else if (Object.values(card).includes("uncommon")) {
      card.values = randomizeValues(uncommon, MAX_VALUE);
    } else if (Object.values(card).includes("rare")) {
      card.values = randomizeValues(rare, MAX_VALUE);
    } else if (Object.values(card).includes("epic")) {
      card.values = randomizeValues(epic, MAX_VALUE);
    } else if (Object.values(card).includes("legendary")) {
      card.values = randomizeValues(legendary, MAX_VALUE);
    }
  });
};

function useCardsSource() {
  const p1 = {
    name: "Player One",
    id: "playerOne",
  };

  const p2 = {
    name: "Player Two",
    id: "playerTwo",
  };

  const { data: p1cards } = useQuery(["p1cards"], () => fetch(`/${p1.id}.json`).then((res) => res.json()), {
    initialData: [],
  });

  const { data: p2cards } = useQuery(["p2cards"], () => fetch(`/${p2.id}.json`).then((res) => res.json()), {
    initialData: [],
  });

  assignRandomValues(p1cards);
  assignRandomValues(p2cards);

  return { p1cards: p1cards, p2cards: p2cards };
}

export function CardsProvider({ children }) {
  return (
    <>
      <CardsContext.Provider value={useCardsSource()}>{children}</CardsContext.Provider>;
    </>
  );
}
