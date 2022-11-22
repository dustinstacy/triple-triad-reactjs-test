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
      {Array.from({ length: 9 }).map((_, i) => (
        <Cell label={i} />
      ))}
    </StyledBoard>
  );
}
