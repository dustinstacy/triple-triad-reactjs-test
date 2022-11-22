import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button/Button";
import Logo from "../components/Logo/Logo";
import styled from "styled-components";
import logo from "../images/logo.png";

const StartLayout = styled.div`
  width: calc(100vw - 10px);
  height: calc(100vh - 10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2px;
  border: 2px solid black;
`;

const StartLogo = styled.div`
  width: 70vw;
  height: 30vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -5vw;
  border: 2px solid black;
`;

const StartMenu = styled.div`
  width: 20vw;
  height: 8vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2vw;
  border: 2px solid black;
`;

export default function Start() {
  return (
    <div>
      <StartLayout>
        <StartLogo>
          <Logo src={logo} />
        </StartLogo>
        <StartMenu>
          <Link to="./Setup">
            <Button label={"New Game"} />
          </Link>
          <Button label={"How to play"} />
          <Link to="DevEnv">
            <Button label={"Dev page"} />
          </Link>
        </StartMenu>
      </StartLayout>
    </div>
  );
}
