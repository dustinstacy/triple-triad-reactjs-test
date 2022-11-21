import React from "react";
import styled from "styled-components";
import logo from "./logo.png";

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
`;

export default function Logo() {
  return <LogoImage src={logo} alt="Logo" />;
}
