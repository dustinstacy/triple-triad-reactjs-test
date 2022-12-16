import styled from "styled-components";

const Card = (card) => {
  return (
    <CardContainer className="card" name={card.name}>
      <CharImage src={`../images/cardImages/card${card.id}.png`} alt={card.name}></CharImage>
      <Values>
        <Up>{card.values[0]}</Up>
        <Right>{card.values[1]}</Right>
        <Left>{card.values[2]}</Left>
        <Down>{card.values[3]}</Down>
      </Values>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  width: 10vw;
  height: 14vw;
  cursor: pointer;
  border: 2px solid black;
  display: flex;
  justify-content: center;
`;

const CharImage = styled.img`
  width: 105%;
  height: 105%;
  pointer-events: none;
  border-radius: 8px;
  border: 2px solid black;
  margin-top: -2.5%;
`;

const Values = styled.div`
  color: white;
  font-weight: bold;
  font-size: 1.25vw;
  pointer-events: none;
  z-index: 99;
  position: absolute;
`;

const Up = styled.span`
  display: flex;
  margin-top: 0.25vw;
  margin-left: 7vw;
`;

const Right = styled.span`
  display: flex;
  margin-top: -0.75vw;
  margin-left: 6vw;
`;

const Left = styled.span`
  display: flex;
  margin-top: -1.7vw;
  margin-left: 8vw;
`;

const Down = styled.span`
  display: flex;
  margin-top: -0.75vw;
  margin-left: 7vw;
`;

export default Card;
