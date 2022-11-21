import React from "react";
import styled from "styled-components";

const StyledCell = styled.div`
  width: 11vw;
  height: calc(11vw * 1.4);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dotted black;
`;

export default function Cell({ label }) {
  return <StyledCell>{label}</StyledCell>;
}
