import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";

export default function MatchEnd() {
  return (
    <MatchEndLayout>
      <Winner>Winner</Winner>
      <Results>
        <Keeper>Keeper</Keeper>
        <Stats>Stats</Stats>
      </Results>
      <ButtonBar>
        <Link to="../Match">
          <Button label="Rematch" />
        </Link>
        <Link to="../Setup">
          <Button label="New Game" />
        </Link>
        <Link to="/">
          <Button label="Main Menu" />
        </Link>
      </ButtonBar>
    </MatchEndLayout>
  );
}

const MatchEndLayout = styled.div`
  width: calc(100vw - 10px);
  height: calc(100vh - 10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 2px;
  border: 2px solid black;
`;

const Winner = styled.div`
  width: 80vw;
  height: 12.5vw;
  text-align: center;
  font-size: 10vw;
  border: 2px solid black;
`;

const Results = styled.div`
  width: 60vw;
  height: 25vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 2px solid black;
`;

const Keeper = styled.div`
  width: 11vw;
  height: calc(11vw * 1.4);
  text-align: center;
  border: 2px solid black;
`;

const Stats = styled.div`
  width: 40vw;
  height: 20vw;
  text-align: center;
  border: 2px solid black;
`;

const ButtonBar = styled.div`
  width: 60vw;
  height: 7vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 2px solid black;
`;
