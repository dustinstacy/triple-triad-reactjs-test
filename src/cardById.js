import { cards } from "./card-data/card-data";

const cardById = (array) => {
  array.forEach((id) => {
    cards.forEach((card) => {
      if (Object.values(card)[0] === id) {
        //console.log(card);
        return card;
      }
    });
  });
};

cardById();
