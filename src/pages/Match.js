import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const Match = () => {
  return (
    <MatchLayout>
      <Link to="../Setup">
        <Button label={"<"} />
      </Link>
      <Link to="../MatchEnd">
        <Button label={">"} />
      </Link>
    </MatchLayout>
  );
};

const MatchLayout = styled.div`
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export default Match;
