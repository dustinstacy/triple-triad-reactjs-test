import { useQuery } from "@tanstack/react-query";
import React, { useContext, createContext, useCallback } from "react";

const MAX_VALUE = 10;

const CpuCardsContext = createContext({});

export function useCpuCards() {
  return useContext(CpuCardsContext);
}

function useCpuCardsSource() {
  const user = {
    name: "Player Two",
    id: "playerTwo",
  };

  const { data: cards } = useQuery(["cards"], () => fetch(`/${user.id}.json`).then((res) => res.json()), {
    initialData: [],
  });

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const common = randomIntFromInterval(8, 12);
  const uncommon = randomIntFromInterval(13, 17);
  const rare = randomIntFromInterval(18, 22);
  const epic = randomIntFromInterval(23, 27);
  const legendary = randomIntFromInterval(28, 32);

  const randomizeValues = useCallback((rarity, max, len = 4) => {
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
  }, []);

  const assignRandomValues = useCallback(
    (array) => {
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
    },
    [epic, legendary, common, uncommon, rare, randomizeValues]
  );

  assignRandomValues(cards);

  return { cards: cards };
}

export function CpuCardsProvider({ children }) {
  return (
    <>
      <CpuCardsContext.Provider value={useCpuCardsSource()}>{children}</CpuCardsContext.Provider>;
    </>
  );
}
