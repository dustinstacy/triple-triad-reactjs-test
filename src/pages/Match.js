import React from "react";
import { Link } from "react-router-dom";
import Board from "../components/Board/Board";
import Score from "../components/Score/Score";
import TurnMarker from "../components/TurnMarker/TurnMarker";
import styled, { css } from "styled-components";
import Card from "../components/Card/Card.js";
import { cards } from "../card-data/card-data.js";

const DECKSIZE = 15;
const HAND_COUNT = 5;

const MatchLayout = styled.div`
  width: calc(100vw - 10px);
  height: calc(100vh - 10px);
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 2px;
  border: 2px solid black;
`;

function createCSS() {
  let styles = "";

  for (let i = 0; i < HAND_COUNT; i++) {
    styles += `
    Card{i} > * > * {
      z-index: {i};
      position: absolute;
      margin-top: -2vw;
      width: 10vw;
      height: calc(9.5vw * 1.4);
      border: 2px solid black;
    }
    `;
  }

  return css`
    ${styles}
  `;
}

const Hand = styled.div`
  width: 15vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${createCSS()};
`;

export default function Match() {
  const playerDeck = [];
  const cpuDeck = [];
  const playerHand = [];
  const cpuHand = [];
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
      }
    });
  };

  assignRandomValues(playerDeck);
  assignRandomValues(cpuDeck);

  function deal(source, dest) {
    for (let card = 0; card < HAND_COUNT; card++) {
      dest.push(source[card]);
      source.shift();
    }
  }

  deal(playerDeck, playerHand);
  deal(cpuDeck, cpuHand);

  return (
    <MatchLayout>
      <Link to="../Setup">
        <TurnMarker label={"<"} />
      </Link>
      <Hand>
        {cpuHand.map((_, i) => (
          <Card key={i + 1000} {...cpuHand[i]} />
        ))}
      </Hand>
      <Score label={"Red Score"} />
      <Board />
      <Score label={"Blue Score"} />
      <Hand>
        {playerHand.map((_, i) => (
          <Card key={i + 2000} {...playerHand[i]} />
        ))}
      </Hand>
      <Link to="../MatchEnd">
        <TurnMarker label={">"} />
      </Link>
    </MatchLayout>
  );
}
