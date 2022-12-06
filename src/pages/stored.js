// const HAND_COUNT = 5;
// const CELL_COUNT = 9;
// import { cards } from "../card-data/card-data.js";

// const DECKSIZE = 15;
// const MAX_VALUE = 10;

// export default function Match() {
//   const cpuDeck = [];
//   const playerHand = [];
//   const cpuHand = [];
//   const cellArray = [];

//   const table = [];
//   table["pd"] = playerDeck;
//   table["cd"] = cpuDeck;
//   table["ph"] = playerHand;
//   table["ch"] = cpuHand;
//   table["ca"] = cellArray;

//   randomizeDeck(cpuDeck);

//   assignRandomValues(cpuDeck);

//   function deal(source, dest) {
//     for (let card = 0; card < HAND_COUNT; card++) {
//       dest.push(source[card]);
//       source.shift();
//     }
//   }

//   deal(playerDeck, playerHand);
//   deal(cpuDeck, cpuHand);

//   const assignId = () => {
//     for (let i = 0; i < playerHand.length; i++) {
//       let card = playerHand[i];
//       card.index = i;
//     }
//   };

//   assignId();

// const randomizeHand = useCallback((array) => {
//   let newCardsArray = [...cards];
//   for (let i = 0; i < DECKSIZE; i++) {
//     const randomIndex = Math.floor(Math.random() * cards.length);
//     array.push(Object.values(newCardsArray)[randomIndex]);
//     newCardsArray.pop(newCardsArray[randomIndex]);
//   }
// }, []);

//   const fillCellArray = () => {
//     for (let i = 0; i < CELL_COUNT; i++) {
//       cellArray.push(
//         <Cell className="cell" id={i} key={i}>
//           {i}
//         </Cell>
//       );
//     }
//   };

//   fillCellArray();

//   console.log(playerHand);

//   const [playerDeck, setPlayerDeck] = useState([]);
//   const deck = [];

//   useEffect(() => {
//     setPlayerDeck(deck);
//   }, []);

// const Hand = styled.div`
//   height: 90vw;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;

//   & > :nth-child(1) {
//     position: absolute;
//     margin-top: -30%;
//   }

//   & > :nth-child(2) {
//     position: absolute;
//     margin-top: -15%;
//   }

//   & > :nth-child(3) {
//     position: absolute;
//   }

//   & > :nth-child(4) {
//     position: absolute;
//     margin-top: 15%;
//   }

//   & > :nth-child(5) {
//     position: absolute;
//     margin-top: 30%;
//   }
// `;

// const Board = styled.div`
//   width: 35vw;
//   height: calc(35vw * 1.4);
//   display: flex;
//   flex-wrap: wrap;
//   align-items: center;
//   align-content: center;
//   justify-content: center;
//   border: 2px solid black;
// `;
