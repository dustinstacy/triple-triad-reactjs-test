import React from "react";
import styled from "styled-components";

const StyledScore = styled.div`
  width: 5vw;
  height: 5vw;
  display: flex;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  margin-top: 2vw;
  border: 2px solid black;
`;

export default function Score({ label }) {
  return <StyledScore>{label}</StyledScore>;
}
