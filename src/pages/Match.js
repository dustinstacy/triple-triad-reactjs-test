import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Cell from "../components/Cell";
import Card from "../components/Card";
import { cards } from "../card-data/card-data";

const DECKSIZE = 10;
const MAX_VALUE = 10;

const Match = () => {
  const [start, setStart] = useState(false);

  const [cellOne, setCellOne] = useState("");
  //  const [cellTwo, setCellTwo] = useState("");
  //  const [practice, setPractice] = useState("");
  //
  const boardState = {
    cellOne,
    setCellOne,
  };

  const playerDeck = [];

  // const setCardOne = (_card) => {
  //   setCellOne(_card);
  //   return cellOne;
  // };

  //useEffect(() => {
  //  if (userAddress === "" && init === true) {
  //      userDidMount();
  //   }
  //}, [userDidMount, init, userAddress]);

  //
  //  const q = (x) => {
  //    setPractice(x);
  //    console.log(practice);
  //  };
  //
  //MAYBE SET ALL THE STATE IN APP.JS
  //
  //TO ACCESS IN OTHER COMPONENTS, USE THIS SYNTAX
  //
  // import { useBoard } from "../context/BoardContext";
  //
  //
  //  const boardState = {
  //    cellOne,
  //    setCellOne,
  //    cellTwo,
  //    setCellTwo,
  //    practice,
  //    setPractice,
  //  } = useBoard();

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const common = randomIntFromInterval(8, 12);
  const uncommon = randomIntFromInterval(13, 17);
  const rare = randomIntFromInterval(18, 22);
  const epic = randomIntFromInterval(23, 27);
  const legendary = randomIntFromInterval(28, 32);

  const randomizeDeck = useCallback((array) => {
    for (let i = 0; i < DECKSIZE; i++) {
      const randomIndex = Math.floor(Math.random() * cards.length);
      array.push(Object.values(cards)[randomIndex]);
    }
  }, []);

  //randomizeDeck(playerDeck);

  const randomizeValues = useCallback((rarity, max, len = 4) => {
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
  }, []);

  //randomizeValues(playerDeck);

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

  //assignRandomValues(playerDeck);

  const componentDidMount = useCallback(() => {
    randomizeDeck(playerDeck);
    randomizeValues(playerDeck);
    assignRandomValues(playerDeck);
    //randomizeValues(playerDeck);
    //assignRandomValues(playerDeck);
  }, [randomizeDeck, assignRandomValues, randomizeValues, playerDeck]);

  useEffect(() => {
    if (start === false) {
      componentDidMount();
      setCellOne(playerDeck[0]);
      setStart(true);
    }
  }, [start, setStart, playerDeck, componentDidMount]);

  return (
    <MatchLayout>
      <Link to="../Setup">
        <Button label={"<"} />
      </Link>
      {start && <Card {...cellOne} />}
      <Cell {...cellOne} />
      <Link to="../MatchEnd">
        <Button label={">"} />
      </Link>
    </MatchLayout>
  );
};

const MatchLayout = styled.div`
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export default Match;
