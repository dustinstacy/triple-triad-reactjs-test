import React from "react";
import styled from "styled-components";

const LogoImage = styled.img`
  width: 100%;
  height: 100%;
`;

export default function Logo({ src }) {
  return <LogoImage src={src} alt="Logo" />;
}
