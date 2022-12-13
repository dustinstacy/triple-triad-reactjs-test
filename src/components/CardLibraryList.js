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

  console.log(activeFilters);

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
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background: rgba(240, 240, 240);

  & div > h4 {
    margin-bottom: 5%;
    font-size: 1.25vmax;
  }
`;

const CardImage = styled.img`
  height: 80%;
  width: 80%;
  margin-top: 2vh;
  margin-bottom: -2.5vh;
  border-radius: 4px;
  border: 0.05rem solid black;
  background-color: rgba(200, 200, 200);
`;
