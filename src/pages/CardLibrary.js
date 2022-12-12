import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCards, CardsProvider } from "../context/store";
import styled from "styled-components";

const queryClient = new QueryClient();

function SearchBox() {
  const { search, setSearch } = useCards();

  return <SearchBar placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />;
}

const CardList = () => {
  const { cards } = useCards();

  return (
    <>
      {cards.map((card) => (
        <CardBox key={card.id}>
          <div>
            <CardImage src={`../images/cardImages/card${card.id}.png`} alt={card.name}></CardImage>
            <h4>{card.name}</h4>
          </div>
        </CardBox>
      ))}
    </>
  );
};

export default function CardLibrary() {
  // const [user, setUser] = useState(null);

  return (
    <QueryClientProvider client={queryClient}>
      <CardsProvider>
        <Background>
          <Container>
            <SearchContainer>
              <SearchBox />
            </SearchContainer>
            <CardList />
          </Container>
        </Background>
      </CardsProvider>
    </QueryClientProvider>
  );
}

const Background = styled.div`
  min-height: 100%;
  width: 100%;
  background-image: url("./images/canvas2.png");
  background-attachment: fixed;
  background-size: cover;
  z-index: -1;
  position: absolute;
  box-sizing: border-box;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 2vw;
  justify-content: center;
  background: none;
  box-sizing: border-box;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100%;
  margin-bottom: 2.5vw;
  box-sizing: border-box;
`;

const SearchBar = styled.input`
  width: 40vw;
  height: 4vw;
  font-size: 1.5vw;
  text-indent: 5%;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
`;

const CardBox = styled.li`
  text-align: center;
  list-style: none;
  width: 13vw;
  border: 1.5px solid black;
  border-radius: 5px;
  margin: 2vw;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background: rgba(240, 240, 240);

  & div > h4 {
    margin-bottom: 5%;
  }
`;

const CardImage = styled.img`
  margin-top: 10%;
  height: 14vw;
  width: 10vw;
  background-color: rgba(200, 200, 200);
  margin-bottom: -10%;
  border-radius: 5px;
  border: 0.5px solid black;
`;
