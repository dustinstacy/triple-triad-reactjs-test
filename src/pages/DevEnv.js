import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import { cards } from "../card-data/card-data";
import Card from "../components/Card";

const DECKSIZE = 1;

const width = 3;

export default function DevEnv() {
  const [boardArray, setBoardArray] = useState([]);
  const [redHand, setRedHand] = useState([]);
  const [blueHand, setBlueHand] = useState([]);

  const randomizeHand = (array) => {
    for (let i = 0; i < DECKSIZE; i++) {
      const randomIndex = Math.floor(Math.random() * cards.length);
      array.push(Object.values(cards)[randomIndex]);
    }
  };

  const dragStart = () => {
    console.log("drag start");
  };

  const dragDrop = () => {
    console.log("drag drop");
  };
  const dragEnd = () => {
    console.log("drag end");
  };

  const createBoard = () => {
    const emptyCellArray = [];
    for (let i = 0; i < width * width; i++) {
      const emptyCell = {};
      emptyCellArray.push(emptyCell);
    }
    setBoardArray(emptyCellArray);
  };

  const createHands = () => {
    const redHandArray = [];
    const blueHandArray = [];
    randomizeHand(redHandArray);
    randomizeHand(blueHandArray);
    setRedHand(redHandArray);
    setBlueHand(blueHandArray);
  };

  useEffect(() => {
    createBoard();
    createHands();
  }, []);

  console.log(boardArray);

  return (
    <DevLayout>
      <DevButton>
        <Link to="/">
          <Button label="Main Menu" />
        </Link>
      </DevButton>
      <Table>
        <Hand>
          {redHand.map((card, index) => (
            <Card
              {...card}
              key={index}
              data-id={index}
              draggable={true}
              onDragStart={dragStart}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={dragEnd}
            />
          ))}
        </Hand>
        <Board>
          {boardArray.map((cell, index) => (
            <Cell
              {...cell}
              key={index}
              data-id={index}
              draggable={false}
              onDragStart={dragStart}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={dragEnd}
            />
          ))}
        </Board>
        <Hand>
          {blueHand.map((card, index) => (
            <Card
              {...card}
              key={index}
              data-id={index}
              draggable={true}
              onDragStart={dragStart}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              onDrop={dragDrop}
              onDragEnd={dragEnd}
            />
          ))}
        </Hand>
      </Table>
    </DevLayout>
  );
}

const DevLayout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: space-around;
  align-items: center;
`;

const DevButton = styled.div``;

const Board = styled.div`
  width: 32vw;
  height: 43.8vw;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
`;

const Cell = styled.div`
  width: 10vw;
  height: 14vw;
  border: 2px dotted black;
`;

const Hand = styled.div`
  height: 100%;
  display: inline-flex;
  flex-direction: column;
  align-items: center;

  & > .card:nth-child(1) {
    z-index: 1;
    position: absolute;
  }
  /*
  & > .card:nth-child(2) {
    z-index: 2;
    position: absolute;
    margin-top: 8%;
  }

  & > .card:nth-child(3) {
    z-index: 3;
    position: absolute;
    margin-top: 16%;
  }

  & > .card:nth-child(4) {
    z-index: 4;
    position: absolute;
    margin-top: 24%;
  }

  & > .card:nth-child(5) {
    z-index: 5;
    position: absolute;
    margin-top: 32%;
  } */
`;

const Table = styled.div`
  width: 100vw;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
`;
