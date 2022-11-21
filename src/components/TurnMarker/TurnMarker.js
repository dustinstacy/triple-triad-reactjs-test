import React from "react";
import styled from "styled-components";

const StyledMarker = styled.div`
  width: 2.5vw;
  height: 5vw;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 2vw;
  border: 2px solid black;
`;

export default function TurnMarker({ label }) {
  return <StyledMarker>{label}</StyledMarker>;
}
