import { useState, useEffect, createContext, useContext } from "react";

const CardContext = createContext({});

function useCardSource(user) {
  const [ownedCards, setOwnedCards] = useState([]);

  useEffect(() => {
    if (user !== null) {
      fetch(`/${user.id}.json`)
        .then((response) => response.json())
        .then((data) => setOwnedCards(data));
    } else {
      fetch(`/demo.json`)
        .then((response) => response.json())
        .then((data) => setOwnedCards(data));
    }
  }, [user]);

  return { ownedCards };
}

const CardList = () => {
  const { cards } = useContext(CardContext);
  return (
    <div>
      {cards.map((card) => (
        <div key={card.id}>{card.name}</div>
      ))}
    </div>
  );
};

function App() {
  const [user, setUser] = useState(null);

  return (
    <CardContext.Provider value={useCardSource(user)}>
      <CardList />
    </CardContext.Provider>
  );
}

export default App;
