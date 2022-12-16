import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import Card from "../components/Card";
import { useCardsCtx } from "../context/DemoCardsContext";

// customizable options?
const width = 3;
const handSize = 5;

const DevEnv = () => {
  const { p1cards, p2cards } = useCardsCtx();
  const [boardArray, setBoardArray] = useState([]);
  const [p1Hand, setP1Hand] = useState([]);
  const [p2Hand, setP2Hand] = useState([]);
  const [cardBeingDragged, setCardBeingDragged] = useState(null);
  const [cellBeingFilled, setCellBeingFilled] = useState(null);
  const [isP1Turn, setisP1Turn] = useState(true);
  const [p1Score, setP1Score] = useState(5);
  const [p2Score, setP2Score] = useState(5);
  const table = [...p1Hand, ...boardArray, ...p2Hand];

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

  const dealCards = useCallback((p1, p2) => {
    for (let card = 0; card < handSize; card++) {
      p1cards[card].owner = "red";
      p1.push(p1cards[card]);
      p2cards[card].owner = "blue";
      p2.push(p2cards[card]);
    }
  }, []);

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
    shuffleCards(p1cards);
    shuffleCards(p2cards);
    dealCards(p1HandArray, p2HandArray);
    setP1Hand(p1HandArray);
    setP2Hand(p2HandArray);
  }, []);

  useEffect(() => {
    createBoard();
    createHands();
  }, [createBoard, createHands]);

  return (
    <DevLayout>
      <ButtonBar>
        <Link to="/">
          <Button label="Main Menu" />
        </Link>
        <Link to="/DevEnv">
          <Button label="Reset" />
        </Link>
      </ButtonBar>
      <Table>
        <P1TurnMarker>{isP1Turn ? "-->" : ""}</P1TurnMarker>
        <Hand>
          {p1Hand.map((card, i) => (
            <P1Cards
              key={card.id}
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
              key={card.id}
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
  );
};

const DevLayout = styled.div`
  width: 99vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: space-around;
  align-items: center;
  background-image: url("./images/stone_table.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
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
  border: 2px dotted grey;
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

const ButtonBar = styled.div`
  display: flex;
`;

export default DevEnv;
