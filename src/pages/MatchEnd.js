import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import Navbar from "../components/Navbar";

export default function MatchEnd() {
  const location = useLocation();
  console.log(location.state.winner);

  return (
    <MatchEndLayout>
      <Navbar />
      <Winner>{location.state.winner}</Winner>
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
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100vw;
  align-items: center;
  background-size: cover;
  position: absolute;
`;

const Winner = styled.div`
  width: 80vw;
  height: 12.5vw;
  margin: 1vh 0vh;
  text-align: center;
  font-size: 10vw;
  border: 2px solid black;
`;

const Results = styled.div`
  margin: 1vh 0vh;
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
  margin: 1vh 0vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 2px solid black;
`;
