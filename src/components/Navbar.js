import React from "react";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export default function Navbar() {
  return (
    <>
      <Nav>
        <NavLink to="/">Start</NavLink>
        <NavLink to="/CardLibrary">CardLibrary</NavLink>
        <NavLink to="/DevEnv">DevEnv</NavLink>
        <NavLink to="/Setup">Setup</NavLink>
        <NavLink to="/Match">Match</NavLink>
        <NavLink to="/MatchEnd">Match End</NavLink>
      </Nav>
    </>
  );
}

const Nav = styled.nav`
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: grey;
  border-bottom: 4px solid black;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  padding: 0 4vw;
  cursor: pointer;
  font-size: 1vmax;
  color: black;
  &.active {
    color: white;
  }
`;
