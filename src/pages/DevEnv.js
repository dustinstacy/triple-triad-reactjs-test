import React, { useEffect, useState, useCallback } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import Card from "../components/Card";
import { cards } from "../card-data/card-data";
import { useP1Cards, useP2Cards, OwnedCardsProvider } from "../context/OwnedCardsContext";

const queryClient = new QueryClient();

const MAX_VALUE = 10;

// customizable options?
const width = 3;
const deckSize = 10;

const Deck = () => {
  const [p1Deck, setP1Deck] = useState([]);
  const [p2Deck, setP2Deck] = useState([]);

  // const p1Cards = useP1Cards();
  const p2Cards = useP2Cards();

  // console.log(p1Cards);
  console.log(p2Cards);
};

const DevEnv = () => {
  const [boardArray, setBoardArray] = useState([]);
  const [p1Hand, setP1Hand] = useState([]);
  const [p2Hand, setP2Hand] = useState([]);
  const [cardBeingDragged, setCardBeingDragged] = useState(null);
  const [cellBeingFilled, setCellBeingFilled] = useState(null);
  const [isP1Turn, setisP1Turn] = useState(true);
  const [p1Score, setP1Score] = useState(5);
  const [p2Score, setP2Score] = useState(5);

  const table = [...p1Hand, ...boardArray, ...p2Hand];

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const common = randomIntFromInterval(8, 12);
  const uncommon = randomIntFromInterval(13, 17);
  const rare = randomIntFromInterval(18, 22);
  const epic = randomIntFromInterval(23, 27);
  const legendary = randomIntFromInterval(28, 32);

  const shuffleCards = useCallback((cards) => {
    let i = cards.length,
      temp,
      rand;
    while (i !== 0) {
      rand = Math.floor(Math.random() * i);
      i--;
      temp = cards[i];
      cards[i] = cards[rand];
      cards[rand] = temp;
    }
    return cards;
  }, []);

  const dealHands = useCallback((p1, p2) => {
    for (let card = 0; card < deckSize; card++) {
      // if even, move to p1 deck
      if (card % 2 === 0) {
        cards[card].owner = "red";
        p1.push(cards[card]);
        // if odd, move to p2 deck
      } else if (card % 2 !== 0) {
        cards[card].owner = "blue";
        p2.push(cards[card]);
      }
    }
  }, []);

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

  const dragStart = (e) => {
    setCardBeingDragged(e.target);
  };

  const dragDrop = (e) => {
    setCellBeingFilled(e.target);
  };

  const dragEnd = () => {
    const cellBeingFilledId = parseInt(cellBeingFilled.getAttribute("data-id"));
    const cardBeingDraggedId = parseInt(cardBeingDragged.getAttribute("data-id"));

    const up = boardArray[cellBeingFilledId - width];
    const right = boardArray[cellBeingFilledId + 1];
    const left = boardArray[cellBeingFilledId - 1];
    const down = boardArray[cellBeingFilledId + width];

    let p1ScoreCounter = 0;
    let p2ScoreCounter = 0;

    boardArray[cellBeingFilledId].empty = "false";
    cellBeingFilled.innerHTML = cardBeingDragged.innerHTML;
    cardBeingDragged.innerHTML = "";

    if (isP1Turn) {
      boardArray[cellBeingFilledId] = {
        ...boardArray[cellBeingFilledId],
        ...p1Hand[cardBeingDraggedId],
      };
    } else if (!isP1Turn) {
      boardArray[cellBeingFilledId] = {
        ...boardArray[cellBeingFilledId],
        ...p2Hand[cardBeingDraggedId],
      };
    }

    if (cellBeingFilledId !== 0 && cellBeingFilledId !== 1 && cellBeingFilledId !== 2 && up.empty === "false") {
      if (up.values[3] < boardArray[cellBeingFilledId].values[0]) {
        up.owner = boardArray[cellBeingFilledId].owner;
      }
    }
    if (cellBeingFilledId !== 0 && cellBeingFilledId !== 3 && cellBeingFilledId !== 6 && left.empty === "false") {
      if (left.values[2] < boardArray[cellBeingFilledId].values[1]) {
        left.owner = boardArray[cellBeingFilledId].owner;
      }
    }
    if (cellBeingFilledId !== 2 && cellBeingFilledId !== 5 && cellBeingFilledId !== 8 && right.empty === "false") {
      if (right.values[1] < boardArray[cellBeingFilledId].values[2]) {
        right.owner = boardArray[cellBeingFilledId].owner;
      }
    }
    if (cellBeingFilledId !== 6 && cellBeingFilledId !== 7 && cellBeingFilledId !== 8 && down.empty === "false") {
      if (down.values[0] < boardArray[cellBeingFilledId].values[3]) {
        down.owner = boardArray[cellBeingFilledId].owner;
      }
    }

    if (isP1Turn) {
      p1Hand.splice([cardBeingDraggedId], 1);
    } else if (!isP1Turn) {
      p2Hand.splice([cardBeingDraggedId], 1);
    }

    setCellBeingFilled(null);
    setCardBeingDragged(null);
    setisP1Turn((current) => !current);
    setBoardArray(boardArray);

    table.forEach((card) => {
      if (card.owner === "blue") {
        p2ScoreCounter++;
      }
      if (card.owner === "red") {
        p1ScoreCounter++;
      }
    });

    setP2Score(p2ScoreCounter);
    setP1Score(p1ScoreCounter);
  };

  const createBoard = useCallback(() => {
    const emptyCellArray = [];
    for (let i = 0; i < width * width; i++) {
      const emptyCell = { empty: "true" };
      emptyCellArray.push(emptyCell);
    }
    setBoardArray(emptyCellArray);
  }, []);

  const createHands = useCallback(() => {
    const p1HandArray = [];
    const p2HandArray = [];
    shuffleCards(cards);
    dealHands(p1HandArray, p2HandArray);
    assignRandomValues(p1HandArray);
    assignRandomValues(p2HandArray);
    setP1Hand(p1HandArray);
    setP2Hand(p2HandArray);
  }, []);

  useEffect(() => {
    createBoard();
    createHands();
  }, [createBoard, createHands]);

  return (
    <QueryClientProvider client={queryClient}>
      <OwnedCardsProvider>
        <DevLayout>
          <Deck />
          <Link to="/">
            <Button label="Main Menu" />
          </Link>
          <Table>
            <P1TurnMarker>{isP1Turn ? "-->" : ""}</P1TurnMarker>
            <Hand>
              {p1Hand.map((card, i) => (
                <P1Cards
                  key={card.number}
                  data-id={i}
                  draggable={isP1Turn ? true : false}
                  onDragStart={dragStart}
                  onDragEnd={dragEnd}
                >
                  <Card {...card} owner={card.owner}></Card>
                </P1Cards>
              ))}
            </Hand>
            <P1Score>{p1Score}</P1Score>
            <Board>
              {boardArray.map((_, i) => (
                <Cell
                  key={i}
                  data-id={i}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={dragDrop}
                  onDragEnd={dragEnd}
                  style={{ backgroundColor: _.owner }}
                ></Cell>
              ))}
            </Board>
            <P2Score>{parseInt(p2Score)}</P2Score>
            <Hand>
              {p2Hand.map((card, i) => (
                <P2Cards
                  key={card.number}
                  data-id={i}
                  draggable={isP1Turn ? false : true}
                  onDragStart={dragStart}
                  onDragEnd={dragEnd}
                >
                  <Card {...card} owner={card.owner}></Card>
                </P2Cards>
              ))}
            </Hand>
            <P2TurnMarker>{isP1Turn ? "" : "<--"}</P2TurnMarker>
          </Table>
        </DevLayout>
      </OwnedCardsProvider>
    </QueryClientProvider>
  );
};

const DevLayout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: space-around;
  align-items: center;
`;

const Board = styled.div`
  width: 33vw;
  height: 45.2vw;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
  justify-content: center;
`;

const Cell = styled.div`
  width: 10.5vw;
  height: 14.7vw;
  border: 2px dotted black;
  display: flex;
  align-items: center;
  justify-content: center;

  > * {
    margin-top: -3%;
  }
`;

const Hand = styled.div`
  height: 100%;
  width: 14vw;
  display: inline-flex;
  flex-direction: column;
  align-items: center;

  & > :nth-child(1) {
    z-index: 1;
    position: absolute;
  }

  & > :nth-child(2) {
    z-index: 2;
    position: absolute;
    margin-top: 8%;
  }

  & > :nth-child(3) {
    z-index: 3;
    position: absolute;
    margin-top: 16%;
  }

  & > :nth-child(4) {
    z-index: 4;
    position: absolute;
    margin-top: 24%;
  }

  & > :nth-child(5) {
    z-index: 5;
    position: absolute;
    margin-top: 32%;
  }
`;

const Table = styled.div`
  width: 100vw;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
`;

const P1Cards = styled.div`
  & > .card {
    background-color: red;
  }
`;

const P2Cards = styled.div`
  & > .card {
    background-color: blue;
  }
`;

const P2TurnMarker = styled.div`
  display: flex;
  align-self: center;
  width: 6vw;
  font-size: 4vw;
  color: blue;
  margin-left: -13vw;
  margin-right: -5vw;
  margin-top: -7vw;
`;

const P1TurnMarker = styled.div`
  display: flex;
  align-self: center;
  width: 6vw;
  font-size: 4vw;
  color: red;
  margin-right: -13vw;
  margin-left: -5vw;
  margin-top: -7vw;
`;

const P2Score = styled.div`
  display: flex;
  justify-content: center;
  width: 4vw;
  font-size: 3vw;
  color: blue;
  margin-left: -6vw;
  margin-right: -10vw;
`;

const P1Score = styled.div`
  display: flex;
  justify-content: center;
  width: 4vw;
  font-size: 3vw;
  color: red;
  margin-right: -6vw;
  margin-left: -10vw;
`;

export default DevEnv;
