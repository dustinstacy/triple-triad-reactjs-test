import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import { cards } from "../card-data/card-data";

const DECK_SIZE = 10;
const MAX_VALUE = 10;

const width = 3;

const DevEnv = () => {
  const [boardArray, setBoardArray] = useState([]);
  const [redHand, setRedHand] = useState([]);
  const [blueHand, setBlueHand] = useState([]);
  const [cardBeingDragged, setCardBeingDragged] = useState(null);
  const [cellBeingFilled, setCellBeingFilled] = useState(null);
  const [isBlueTurn, setIsBlueTurn] = useState(true);

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const common = randomIntFromInterval(8, 12);
  const uncommon = randomIntFromInterval(13, 17);
  const rare = randomIntFromInterval(18, 22);
  const epic = randomIntFromInterval(23, 27);
  const legendary = randomIntFromInterval(28, 32);

  function shuffleCards(cards) {
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
  }

  function dealHands(blue, red) {
    for (let card = 0; card < DECK_SIZE; card++) {
      // if even, move to blue deck
      if (card % 2 === 0) {
        cards[card].owner = "blue";
        blue.push(cards[card]);
        // if odd, move to red deck
      } else if (card % 2 !== 0) {
        cards[card].owner = "red";
        red.push(cards[card]);
      }
    }
  }

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

    boardArray[cellBeingFilledId].empty = "false";
    cellBeingFilled.innerHTML = cardBeingDragged.innerHTML;
    console.log(cardBeingDragged);
    if (isBlueTurn) {
      boardArray[cellBeingFilledId] = {
        ...boardArray[cellBeingFilledId],
        ...blueHand[cardBeingDraggedId],
      };
    } else if (!isBlueTurn) {
      boardArray[cellBeingFilledId] = {
        ...boardArray[cellBeingFilledId],
        ...redHand[cardBeingDraggedId],
      };
    }
    console.log(cellBeingFilledId);
    cardBeingDragged.innerHTML = "";

    if (cellBeingFilledId !== 0 && cellBeingFilledId !== 1 && cellBeingFilledId !== 2 && up.empty === "false") {
      if (up.values[3] > boardArray[cellBeingFilledId].values[0]) {
        console.log("you lose");
      } else if (up.values[3] < boardArray[cellBeingFilledId].values[0]) {
        console.log("you win");
        up.owner = boardArray[cellBeingFilledId].owner;
      } else if (up.values[3] === boardArray[cellBeingFilledId].values[0]) {
        console.log("draw");
      }
    }
    if (cellBeingFilledId !== 0 && cellBeingFilledId !== 3 && cellBeingFilledId !== 6 && left.empty === "false") {
      if (left.values[2] > boardArray[cellBeingFilledId].values[1]) {
        console.log("you lose");
      } else if (left.values[2] < boardArray[cellBeingFilledId].values[1]) {
        console.log("you win");
      } else if (left.values[2] === boardArray[cellBeingFilledId].values[1]) {
        console.log("draw");
      }
    }
    if (cellBeingFilledId !== 2 && cellBeingFilledId !== 5 && cellBeingFilledId !== 8 && right.empty === "false") {
      if (right.values[1] > boardArray[cellBeingFilledId].values[2]) {
        console.log("you lose");
      } else if (right.values[1] < boardArray[cellBeingFilledId].values[2]) {
        console.log("you win");
      } else if (right.values[1] === boardArray[cellBeingFilledId].values[2]) {
        console.log("draw");
      }
    }
    if (cellBeingFilledId !== 7 && cellBeingFilledId !== 8 && cellBeingFilledId !== 9 && down.empty === "false") {
      if (down.values[0] > boardArray[cellBeingFilledId].values[3]) {
        console.log("you lose");
      } else if (down.values[0] < boardArray[cellBeingFilledId].values[3]) {
        console.log("you win");
      } else if (down.values[0] === boardArray[cellBeingFilledId].values[3]) {
        console.log("draw");
      }
    }

    console.log(boardArray);

    setCellBeingFilled(null);
    setCardBeingDragged(null);
    setIsBlueTurn((current) => !current);
    setBoardArray(boardArray);
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
    shuffleCards(cards);
    dealHands(blueHandArray, redHandArray);
    assignRandomValues(redHandArray);
    assignRandomValues(blueHandArray);
    setRedHand(redHandArray);
    setBlueHand(blueHandArray);
    console.log(redHandArray);
    console.log(blueHandArray);
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
          {redHand.map((card, i) => (
            <RedCards key={card.number} data-id={i} draggable={true} onDragStart={dragStart} onDragEnd={dragEnd}>
              <Card className="card" {...card} name={card.name} style={{ backgroundColor: card.owner }}>
                <CharImage src={`../images/cardImages/card${card.number}.png`} alt={card.name}></CharImage>
                <Values>
                  <Up>{card.values[0]}</Up>
                  <Right>{card.values[1]}</Right>
                  <Left>{card.values[2]}</Left>
                  <Down>{card.values[3]}</Down>
                </Values>
              </Card>
            </RedCards>
          ))}
        </Hand>
        <Board>
          {boardArray.map((_, i) => (
            <Container key={i}>
              <Cell data-id={i} onDragOver={(e) => e.preventDefault()} onDrop={dragDrop} onDragEnd={dragEnd}></Cell>
            </Container>
          ))}
        </Board>
        <Hand>
          {blueHand.map((card, i) => (
            <BlueCards key={card.number} data-id={i} draggable={true} onDragStart={dragStart} onDragEnd={dragEnd}>
              <Card className="card" {...card} name={card.name} style={{ backgroundColor: card.owner }}>
                <CharImage src={`../images/cardImages/card${card.number}.png`} alt={card.name}></CharImage>
                <Values>
                  <Up>{card.values[0]}</Up>
                  <Right>{card.values[1]}</Right>
                  <Left>{card.values[2]}</Left>
                  <Down>{card.values[3]}</Down>
                </Values>
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
  width: 10vw;
  height: 14vw;
  cursor: pointer;
  border-radius: 4px;
  border: 2px solid black;
  display: flex;
  justify-content: center;
`;

const Container = styled.div``;

const RedCards = styled.div``;

const BlueCards = styled.div``;

const CharImage = styled.img`
  width: 100%;
  height: 100%;
  pointer-events: none;
  border-radius: 8px;
  border: 2px solid black;
`;

const Values = styled.div`
  color: white;
  font-weight: bold;
  font-size: 1.25vw;
  pointer-events: none;
  z-index: 99;
  position: absolute;
`;

const Up = styled.span`
  display: flex;
  margin-top: 0.25vw;
  margin-left: 7vw;
`;

const Right = styled.span`
  display: flex;
  margin-top: -0.75vw;
  margin-left: 6vw;
`;

const Left = styled.span`
  display: flex;
  margin-top: -1.7vw;
  margin-left: 8vw;
`;

const Down = styled.span`
  display: flex;
  margin-top: -0.75vw;
  margin-left: 7vw;
`;

export default DevEnv;
