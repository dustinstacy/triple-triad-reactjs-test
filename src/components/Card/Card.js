import React from "react";
import styled from "styled-components";

const StyledCard = styled.div`
  width: 11vw;
  height: calc(11vw * 1.9);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dotted black;
`;

const Card = (card) => {
  return (
    <StyledCard>
      <div className="card" id={card.id} name={card.name}>
        <img id="image" src={`./images/cards/card${card.id}.png`} alt=""></img>
        <img
          id="element"
          src={`./images/elements/${card.element}.png`}
          alt=""
        ></img>
        <img
          id="rarity"
          src={`./images/rarities/${card.rarity}.png`}
          alt=""
        ></img>
        <span id="up">{card.values[0]}</span>
        <span id="right">{card.values[1]}</span>
        <span id="left">{card.values[2]}</span>
        <span id="down">{card.values[3]}</span>
      </div>
    </StyledCard>
  );
};

export default Card;
