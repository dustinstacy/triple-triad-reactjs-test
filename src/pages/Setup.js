import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import Navbar from "../components/Navbar";

export default function Setup() {
  return (
    <SetupLayout>
      <Navbar />
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
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100vw;
  align-items: center;
  background-size: cover;
  position: absolute;
`;

const SetupMenu = styled.div`
  width: 60vw;
  height: 40vw;
  margin: 1vw 0vw;
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
