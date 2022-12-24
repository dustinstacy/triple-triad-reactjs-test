import styled from "styled-components";
import { useCards } from "../context/CardLibraryContext";

function Filter({ activeFilters, setActiveFilters }) {
  const { cards } = useCards();

  const elementArray = [];

  cards.forEach((card) => {
    if (!elementArray.includes(card.element)) {
      elementArray.push(card.element);
    }
  });

  const toggleFilter = (e, filter) => {
    if (activeFilters === null) {
      setActiveFilters([]);
    }
    if (e.target.active === undefined) {
      e.target.active = true;
    }

    console.log(e.target.active);
    if (e.target.active === true) {
      setActiveFilters((current) => [...current, filter]);
      e.target.classList.add("selected");
      e.target.active = false;
    } else if (e.target.active === false) {
      setActiveFilters((current) => [...current].filter((i) => i !== filter));
      e.target.active = true;
    }

    console.log(e.target);
  };

  return (
    <FilterContainer>
      <FilterButton onClick={() => setActiveFilters(null)}>All</FilterButton>
      {elementArray.map((element) => (
        <FilterButton key={element} onClick={(e) => toggleFilter(e, element)} active={false}>
          {element}
        </FilterButton>
      ))}
    </FilterContainer>
  );
}

const FilterContainer = styled.div``;

const FilterButton = styled.button`
  width: 5vw;
  height: 4vh;
  line-height: 0.5vh;
  background-color: rgba(240, 240, 240);
  margin: 0 0.25vw;
  border: 2px solid #1a1a1a;
  border-radius: 15px;
  color: #3b3b3b;
  cursor: pointer;
  padding: 16px 24px;
  text-align: center;
  text-decoration: none;

  &:hover {
    color: #fff;
    background-color: #1a1a1a;
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
  }
`;

export default Filter;
