import React, { useContext } from "react";

export const BoardContext = React.createContext({
  cellOne: {},
  setCellOne: () => {},
  cellTwo: {},
  setCellTwo: () => {},
  practice: "",
  setPractice: () => {},
});

export const BoardProvider = BoardContext.Provider;
export const useBoard = () => useContext(BoardContext);
