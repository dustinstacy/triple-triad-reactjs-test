import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";

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

const SetupLayout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

const SetupMenu = styled.div`
  width: 60vw;
  height: 40vw;
  margin-bottom: 1vw;
  border: 2px solid black;
  border-radius: 5%;
`;

const ButtonBar = styled.div`
  width: 50vw;
  height: 5vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 2px solid black;
  border-radius: 20%;
`;
