import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import Navbar from "../components/Navbar";

export default function Start() {
  return (
    <StartLayout>
      <Navbar />
      <StartLogo>
        <Logo src={"./images/logo.png"} />
      </StartLogo>
      <StartMenu>
        <Link to="./Setup">
          <Button label={"New Game"} />
        </Link>
        <Link to="./CardLibrary">
          <Button label={"Card Library"} />
        </Link>
        <Link to="./DevEnv">
          <Button label={"Dev page"} />
        </Link>
      </StartMenu>
    </StartLayout>
  );
}

const StartLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

const StartLogo = styled.div`
  width: 70vw;
  height: 30vw;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5vh;
`;

const StartMenu = styled.div`
  width: 15vw;
  height: 20vh;
  padding: 1vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 2px solid black;
  border-radius: 10%;
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
`;
