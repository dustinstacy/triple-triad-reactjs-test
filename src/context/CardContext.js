import { useState } from "react";
import { useCards, CardsProvider } from "./store";

function SearchBox() {
  const { search, setSearch } = useCards();
  return <input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />;
}

const CardList = () => {
  const { cards } = useCards();
  return (
    <ul>
      {cards.map((card) => (
        <li key={card.id}>
          <div>
            <img src={``} alt="" />
            <h3>{card.name}</h3>
          </div>
        </li>
      ))}
    </ul>
  );
};

function App() {
  const [user, setUser] = useState(null);

  return (
    <CardsProvider>
      <SearchBox />
      <CardList />
    </CardsProvider>
  );
}

export default App;
