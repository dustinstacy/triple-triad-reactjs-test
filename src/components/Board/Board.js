import React from "react";
import styled from "styled-components";
import Cell from "../Cell/Cell";

const StyledBoard = styled.div`
  width: 35vw;
  height: calc(35vw * 1.4);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  justify-content: center;
  border: 2px solid black;
`;

export default function Board() {
  return (
    <StyledBoard>
      <Cell label={1} />
      <Cell label={2} />
      <Cell label={3} />
      <Cell label={4} />
      <Cell label={5} />
      <Cell label={6} />
      <Cell label={7} />
      <Cell label={8} />
      <Cell label={9} />
    </StyledBoard>
  );
}
