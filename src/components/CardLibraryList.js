import { useCards } from "../context/CardLibraryContext";
import styled from "styled-components";

const CardLibraryList = ({ activeFilters }) => {
  const { cards } = useCards();

  const filteredCards = () => {
    if (activeFilters === null) {
      return cards;
    } else {
      return cards.filter((card) => card.element === activeFilters[0]);
    }
  };

  return (
    <CardsContainer>
      {filteredCards().map((card) => (
        <CardBox key={card.id}>
          <div>
            <CardImage src={`../images/cardImages/card${card.id}.png`} alt={card.name}></CardImage>
            <h4>{card.name}</h4>
          </div>
        </CardBox>
      ))}
    </CardsContainer>
  );
};

export default CardLibraryList;

const CardsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 3vh;
`;

const CardBox = styled.li`
  text-align: center;
  list-style: none;
  width: 13vw;
  margin: 2vw;
  border: 0.1vmax solid black;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.6) 0px 54px 55px, rgba(0, 0, 0, 0.3) 0px -12px 30px, rgba(0, 0, 0, 0.3) 0px 4px 6px,
    rgba(0, 0, 0, 0.3) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  /* background: radial-gradient(
    circle,
    rgba(255, 255, 255, 1) 0%,
    rgba(170, 162, 121, 1) 85%,
    rgba(66, 64, 54, 1) 87%,
    rgba(79, 69, 30, 1) 89%)*/
  background-image: url("./images/marble2.jpg");
  background-size: cover;
  & div > h4 {
    margin-bottom: 5%;
    font-size: 1.25vmax;
    color: rgba(230, 230, 230);
    text-shadow: 1.5px 1.5px black, -1.5px -1.5px black, 1.5px -1.5px black, -1.5px 1.5px black;
    -webkit-text-stroke: 1px black;
  }
`;

const CardImage = styled.img`
  height: 80%;
  width: 80%;
  margin-top: 3vh;
  margin-bottom: -3vh;
  border-radius: 4px;
  border: 0.05rem solid black;
  background-color: rgba(200, 200, 200);
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
`;
