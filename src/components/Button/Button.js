import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: 12.5vw;
  height: 3vw;
  margin: 0.3vw;
  color: black;
  border: 2px solid black;
  font-size: 1.25vw;
  cursor: pointer;
`;

export default function Button({ label }) {
  return <StyledButton>{label}</StyledButton>;
}
