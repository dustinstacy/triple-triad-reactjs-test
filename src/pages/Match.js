import React from "react";
import { Link } from "react-router-dom";
import Hand from "../components/Hand/Hand";
import Board from "../components/Board/Board";
import Score from "../components/Score/Score";
import TurnMarker from "../components/TurnMarker/TurnMarker";
import styled from "styled-components";

const MatchLayout = styled.div`
  width: calc(100vw - 10px);
  height: calc(100vh - 10px);
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 2px;
  border: 2px solid black;
`;

export default function Match() {
  return (
    <MatchLayout>
      <Link to="../Setup">
        <TurnMarker label={"<"} />
      </Link>
      <Hand label={"Red Hand"} />
      <Score label={"Red Score"} />
      <Board />
      <Score label={"Blue Score"} />
      <Hand label={"Blue Hand"} />
      <Link to="../MatchEnd">
        <TurnMarker label={">"} />
      </Link>
    </MatchLayout>
  );
}
