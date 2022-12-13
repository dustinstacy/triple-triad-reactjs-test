import { useCards } from "../context/CardLibraryContext";
import styled from "styled-components";

function SearchBar() {
  const { search, setSearch } = useCards();

  return (
    <SearchContainer>
      <SearchBox placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
    </SearchContainer>
  );
}

export default SearchBar;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 5vh;
`;

const SearchBox = styled.input`
  width: 40vw;
  height: 6vh;
  margin-bottom: 2vh;
  font-size: 2vmax;
  text-indent: 1em;
  border-radius: 0.25em;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
`;
