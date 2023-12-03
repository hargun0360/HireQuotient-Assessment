import SearchIcon from "@mui/icons-material/Search";
import { useRef } from "react";
const SearchBar = ({ searchHandler }) => {

  const userInput = useRef(null);
  const onSubmit = (e) => {
    e.preventDefault();
    searchHandler(userInput.current.value);
  };
  return (
    <div className="search-container">
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Search" name="search" ref={userInput} />
        <button type="submit">
          <SearchIcon />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
