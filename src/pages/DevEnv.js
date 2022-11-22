import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button/Button";
import styled from "styled-components";
import Card from "../components/Card/Card.js";
import { cards } from "../card-data/card-data.js";

const DECKSIZE = 15;

const DevLayout = styled.div`
  width: calc(100vw - 10px);
  height: calc(100vh - 10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2px;
  border: 2px solid black;
`;

const DevButton = styled.div`
  height: 100%;
  display: flex;
`;

export default function DevEnv() {
  const playerDeck = [];
  const cpuDeck = [];
  const max = 10;

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const common = randomIntFromInterval(8, 12);
  const uncommon = randomIntFromInterval(13, 17);
  const rare = randomIntFromInterval(18, 22);
  const epic = randomIntFromInterval(23, 27);
  const legendary = randomIntFromInterval(28, 32);

  const randomizeDeck = (array) => {
    for (let i = 0; i < DECKSIZE; i++) {
      const randomIndex = Math.floor(Math.random() * cards.length);
      array.push(Object.values(cards)[randomIndex]);
    }
  };

  randomizeDeck(playerDeck);
  randomizeDeck(cpuDeck);

  const randomizeValues = (rarity, max, len = 4) => {
    let startValues = new Array(len);
    let sum = 0;
    do {
      for (let i = 0; i < len; i++) {
        startValues[i] = Math.random();
      }
      sum = startValues.reduce((acc, val) => acc + val, 0);
      const scale = (rarity - len) / sum;
      startValues = startValues.map((val) =>
        Math.min(max, Math.round(val * scale) + 1)
      );
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
        card.values = randomizeValues(common, max);
      } else if (Object.values(card).includes("uncommon")) {
        card.values = randomizeValues(uncommon, max);
      } else if (Object.values(card).includes("rare")) {
        card.values = randomizeValues(rare, max);
      } else if (Object.values(card).includes("epic")) {
        card.values = randomizeValues(epic, max);
      } else if (Object.values(card).includes("legendary")) {
        card.values = randomizeValues(legendary, max);
        console.log(card.values);
      }
    });
  };

  assignRandomValues(playerDeck);
  assignRandomValues(cpuDeck);

  const card1 = playerDeck[0];

  console.log(card1);

  return (
    <DevLayout>
      <DevButton>
        <Link to="/">
          <Button label="Main Menu" />
        </Link>
      </DevButton>
      <Card {...card1}></Card>
    </DevLayout>
  );
}
