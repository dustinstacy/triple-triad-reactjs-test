import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import { cards } from "../card-data/card-data";

const DECKSIZE = 5;

const width = 3;

const DevEnv = () => {
  const [boardArray, setBoardArray] = useState([]);
  const [redHand, setRedHand] = useState([]);
  const [blueHand, setBlueHand] = useState([]);
  const [cardBeingDragged, setCardBeingDragged] = useState(null);
  const [cellBeingFilled, setCellBeingFilled] = useState(null);

  const dragStart = (e) => {
    setCardBeingDragged(e.target);
  };

  const dragDrop = (e) => {
    setCellBeingFilled(e.target);
  };

  const dragEnd = () => {
    const cellBeingFilledId = parseInt(cellBeingFilled.getAttribute("data-id"));
    const cardBeingDraggedId = parseInt(
      cardBeingDragged.getAttribute("data-id")
    );

    boardArray[cellBeingFilledId].empty = "false";
    cellBeingFilled.innerHTML = cardBeingDragged.innerHTML;
    cardBeingDragged.innerHTML = "";

    console.log(boardArray);
    console.log("cellBeingFilledId", cellBeingFilledId);
    console.log("cardBeingDraggedId", cardBeingDraggedId);
  };

  const randomizeHand = (array) => {
    for (let i = 0; i < DECKSIZE; i++) {
      const randomIndex = Math.floor(Math.random() * cards.length);
      array.push(Object.values(cards)[randomIndex]);
    }
  };

  const createBoard = () => {
    const emptyCellArray = [];
    for (let i = 0; i < width * width; i++) {
      // const emptyCell = { state: isEmpty };
      const emptyCell = { empty: "true" };
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

  return (
    <DevLayout>
      <DevButton>
        <Link to="/">
          <Button label="Main Menu" />
        </Link>
      </DevButton>
      <Table>
        <Hand>
          {redHand.map((card) => (
            <RedCards
              key={card.number}
              data-id={card.number}
              draggable={true}
              onDragStart={dragStart}
              onDragEnd={dragEnd}
            >
              <Card className="card" {...card} name={card.name}>
                {card.number}
              </Card>
            </RedCards>
          ))}
        </Hand>
        <Board>
          {boardArray.map((_, i) => (
            <Container key={i}>
              <Cell
                data-id={i}
                onDragOver={(e) => e.preventDefault()}
                onDrop={dragDrop}
                onDragEnd={dragEnd}
              ></Cell>
            </Container>
          ))}
        </Board>
        <Hand>
          {blueHand.map((card) => (
            <BlueCards
              key={card.number}
              data-id={card.number}
              draggable={true}
              onDragStart={dragStart}
              onDragEnd={dragEnd}
            >
              <Card className="card" {...card} name={card.name}>
                {card.number}
              </Card>
            </BlueCards>
          ))}
        </Hand>
      </Table>
    </DevLayout>
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
  display: flex;
  align-items: center;
  justify-content: center;
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

const Card = styled.div`
  width: 11vw;
  height: calc(11vw * 1.4);
  cursor: pointer;
  border-radius: 4px;
  border: 2px solid black;
  display: flex;
  justify-content: center;
`;

const Container = styled.div``;

const RedCards = styled.div`
  background-color: red;
`;

const BlueCards = styled.div`
  background-color: blue;
`;

// const CharImage = styled.img`
//   width: 100%;
//   height: 100%;
//   pointer-events: none;
//   border-radius: 8px;
//   border: 2px solid black;
// `;

export default DevEnv;
