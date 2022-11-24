import React from "react";
import styled from "styled-components";
import Card from "./Card/Card";

const StyledDeck = styled.div`
  display: none;
`;

const Deck = (deck) => {
  return (
    <StyledDeck>
      {deck.map((_, i) => (
        <Card {...deck[i]} />
      ))}
    </StyledDeck>
  );
};

export default Deck;
