import React from "react";
import styled from "styled-components";

export default function Button({ label }) {
  return <StyledButton>{label}</StyledButton>;
}

const StyledButton = styled.button`
  width: 10vw;
  height: 3vw;
  margin: 0.3vw;
  color: black;
  border: 2px solid black;
  border-radius: 5px;
  font-size: 1.25vw;
  cursor: pointer;
`;
