import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import { cards } from "../card-data/card-data";

const width = 3;

export default function DevEnv() {
  const [boardArray, setBoardArray] = useState([]);

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

  useEffect(() => {
    createBoard();
  }, []);

  console.log(boardArray);

  return (
    <DevLayout>
      <DevButton>
        <Link to="/">
          <Button label="Main Menu" />
        </Link>
      </DevButton>
      <Board>
        {boardArray.map((cell, index) => (
          <Cell
            {...cell}
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
      </Board>
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
