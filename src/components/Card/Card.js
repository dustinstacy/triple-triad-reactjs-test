import React from "react";
import styled from "styled-components";

const StyledCard = styled.div`
  width: 11vw;
  height: calc(11vw * 1.4);
`;

const CharImage = styled.img`
  width: 100%;
  height: 100%;
  pointer-events: none;
  cursor: pointer:
  position: absolute;
`;

const Up = styled.span`
  display: flex;
  margin-left: 7.75vw;
  margin-top: -13.25vw;
  color: white;
  font-weight: bold;
  font-size: 1.1vw;
  pointer-events: none;
`;
const Right = styled.span`
  display: flex;
  margin-left: 8.75vw;
  margin-top: -0.6vw;
  color: white;
  font-weight: bold;
  font-size: 1.1vw;
  pointer-events: none;
`;

const Left = styled.span`
  display: flex;
  margin-left: 6.75vw;
  margin-top: -1.5vw;
  color: white;
  font-weight: bold;
  font-size: 1.1vw;
  pointer-events: none;
`;

const Down = styled.span`
  display: flex;
  margin-left: 7.75vw;
  margin-top: -0.6vw;
  color: white;
  font-weight: bold;
  font-size: 1.1vw;
  pointer-events: none;
`;

const Card = (card) => {
  return (
    <StyledCard>
      <div
        className="card"
        id={card.id}
        name={card.name}
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(134,135,136,1) 100%)",
        }}
      >
        <CharImage
          id="image"
          src={`../images/cardImages/card${card.id}.png`}
          alt=""
        ></CharImage>
        <Up>{card.values[0]}</Up>
        <Right>{card.values[1]}</Right>
        <Left>{card.values[2]}</Left>
        <Down>{card.values[3]}</Down>
      </div>
    </StyledCard>
  );
};

export default Card;
