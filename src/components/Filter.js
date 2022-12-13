import styled from "styled-components";

function Filter({ setActiveFilters }) {
  return (
    <FilterContainer>
      <FilterButton onClick={() => setActiveFilters(null)}>All</FilterButton>
      <FilterButton onClick={() => setActiveFilters(["fire"])}>Fire</FilterButton>
      <FilterButton onClick={() => setActiveFilters(["water"])}>Water</FilterButton>
      <FilterButton onClick={() => setActiveFilters(["earth"])}>Earth</FilterButton>
      <FilterButton onClick={() => setActiveFilters(["holy"])}>Holy</FilterButton>
      <FilterButton onClick={() => setActiveFilters(["dark"])}>Dark</FilterButton>
      <FilterButton onClick={() => setActiveFilters([])}>None</FilterButton>
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
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  touch-action: manipulation;
  will-change: transform;

  &:disabled {
    pointer-events: none;
  }

  &:hover {
    color: #fff;
    background-color: #1a1a1a;
    box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
    transform: translateY(-2px);
  }

  &:active {
    box-shadow: none;
    transform: translateY(0);
  }
`;

export default Filter;
