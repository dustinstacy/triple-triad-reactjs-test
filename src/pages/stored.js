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

//   const randomIntFromInterval = (min, max) => {
//     return Math.floor(Math.random() * (max - min + 1) + min);
//   };

//   const common = randomIntFromInterval(8, 12);
//   const uncommon = randomIntFromInterval(13, 17);
//   const rare = randomIntFromInterval(18, 22);
//   const epic = randomIntFromInterval(23, 27);
//   const legendary = randomIntFromInterval(28, 32);

//   const randomizeDeck = (array) => {
//     for (let i = 0; i < DECKSIZE; i++) {
//       const randomIndex = Math.floor(Math.random() * cards.length);
//       array.push(Object.values(cards)[randomIndex]);
//     }
//   };

//   randomizeDeck(deck);
//   console.log(deck);

//   const randomizeValues = (rarity, max, len = 4) => {
//     let startValues = new Array(len);
//     let sum = 0;
//     do {
//       for (let i = 0; i < len; i++) {
//         startValues[i] = Math.random();
//       }
//       sum = startValues.reduce((acc, val) => acc + val, 0);
//       const scale = (rarity - len) / sum;
//       startValues = startValues.map((val) =>
//         Math.min(max, Math.round(val * scale) + 1)
//       );
//       sum = startValues.reduce((acc, val) => acc + val, 0);
//     } while (sum - rarity);
//     const values = startValues.map((value) => {
//       if (value === 10) {
//         return "A";
//       }
//       return value;
//     });
//     return values;
//   };

//   randomizeValues(deck);

//   const assignRandomValues = (array) => {
//     array.forEach((card) => {
//       if (Object.values(card).includes("common")) {
//         card.values = randomizeValues(common, MAX_VALUE);
//       } else if (Object.values(card).includes("uncommon")) {
//         card.values = randomizeValues(uncommon, MAX_VALUE);
//       } else if (Object.values(card).includes("rare")) {
//         card.values = randomizeValues(rare, MAX_VALUE);
//       } else if (Object.values(card).includes("epic")) {
//         card.values = randomizeValues(epic, MAX_VALUE);
//       } else if (Object.values(card).includes("legendary")) {
//         card.values = randomizeValues(legendary, MAX_VALUE);
//       }
//     });
//   };

//   assignRandomValues(deck);

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

// const Cell = styled.div`
//   width: 11vw;
//   height: calc(11vw * 1.4);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border: 2px dotted black;
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
