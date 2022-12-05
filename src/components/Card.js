import React, { useState } from "react";
import styled from "styled-components";

const Card = (card, index) => {
  // const [cardSelected, setCardSelected] = useState("false");

  // const handleClick = (e) => {
  //   const card = e.target;
  //   setCardSelected((current) => !current);
  //   if (cardSelected) {
  //     card.style.transform = "scale(1.3)";
  //   } else if (!cardSelected) {
  //     card.style.transform = "scale(1)";
  //   }
  //   console.log(card);
  // };

  const dragStart = () => {
    console.log("drag start");
  };

  const dragDrop = () => {
    console.log("drag drop");
  };
  const dragEnd = () => {
    console.log("drag end");
  };

  return (
    <Container
      className="card"
      number={card.number}
      key={index}
      name={card.name}
      data-id={index}
      draggable={true}
      onDragStart={dragStart}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={(e) => e.preventDefault()}
      onDragLeave={(e) => e.preventDefault()}
      onDrop={dragDrop}
      onDragEnd={dragEnd}
    >
      <CharImage
        src={`../images/cardImages/card${card.number}.png`}
        alt={card.name}
      ></CharImage>
      {/* <Values>
        <Up>{card.values[0]}</Up>
        <Right>{card.values[1]}</Right>
        <Left>{card.values[2]}</Left>
        <Down>{card.values[3]}</Down>
      </Values> */}
    </Container>
  );
};

const Container = styled.div`
  width: 11vw;
  height: calc(11vw * 1.4);
  cursor: pointer;
  border-radius: 4px;
`;

const CharImage = styled.img`
  width: 100%;
  height: 100%;
  pointer-events: none;
  border-radius: 8px;
  border: 2px solid black;
`;

const Values = styled.div`
  color: rgb(249, 249, 249, 0.8);
  font-weight: bold;
  font-size: 1.25vw;
  pointer-events: none;
  z-index: 99;
`;

const Up = styled.span`
  display: flex;
  margin-top: -15.25vw;
  margin-left: 8.5vw;
`;

const Right = styled.span`
  display: flex;
  margin-top: -0.7vw;
  margin-left: 9.5vw;
`;

const Left = styled.span`
  display: flex;
  margin-top: -1.7vw;
  margin-left: 7.5vw;
`;

const Down = styled.span`
  display: flex;
  margin-top: -0.7vw;
  margin-left: 8.5vw;
`;

export default Card;
