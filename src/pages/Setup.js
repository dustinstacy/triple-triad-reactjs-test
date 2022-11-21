import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button/Button";
import styled from "styled-components";

const SetupLayout = styled.div`
  width: calc(100vw - 10px);
  height: calc(100vh - 10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2px;
  border: 2px solid black;
`;

const SetupMenu = styled.div`
  width: 60vw;
  height: 40vw;
  margin-bottom: 1vw;
  border: 2px solid black;
`;

const ButtonBar = styled.div`
  width: 60vw;
  heigt: 4vw;
  display: flex;
  justify-content: space-around;
  border: 2px solid black;
`;

export default function Setup() {
  return (
    <SetupLayout>
      <SetupMenu></SetupMenu>
      <ButtonBar>
        <Link to="/">
          <Button label="Main Menu" />
        </Link>
        <Link to="../Match">
          <Button label="Start Game" />
        </Link>
      </ButtonBar>
    </SetupLayout>
  );
}
