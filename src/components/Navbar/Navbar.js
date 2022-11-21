import React from "react";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  background: #ffb3ff;
  height: 85px;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem calc((100vw - 1000px) / 2);
`;

const NavLink = styled(Link)`
  text-decoration: none;
  padding: 0 1rem;
  cursor: pointer;
  &.active {
    color: #4d4dff;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
`;

export default function Navbar() {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/">Start</NavLink>
          <NavLink to="/Setup">Setup</NavLink>
          <NavLink to="/Match">Match</NavLink>
          <NavLink to="/MatchEnd">Match End</NavLink>
        </NavMenu>
      </Nav>
    </>
  );
}
