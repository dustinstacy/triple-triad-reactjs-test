import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";

export default function DevEnv() {
  return (
    <DevLayout>
      <DevButton>
        <Link to="/">
          <Button label="Main Menu" />
        </Link>
      </DevButton>
    </DevLayout>
  );
}

const DevLayout = styled.div`
  width: calc(100vw - 10px);
  height: calc(100vh - 10px);
  display: flex;
  flex-direction: column;
  margin: 2px;
  border: 2px solid black;
`;

const DevButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;
