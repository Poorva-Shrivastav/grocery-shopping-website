import React, { useContext } from "react";
import "./SearchBar.css";
import { IoIosOptions } from "react-icons/io";
import { SearchItemContext } from "../../context/Context";

function SearchBar() {
  const { onChangeHandler, searchHandler, inputVal } =
    useContext(SearchItemContext);
  return (
    <div className="search-outermost-div">
      <input
        type="search"
        placeholder="Search"
        value={inputVal || ""}
        onChange={(e) => onChangeHandler(e)}
        onKeyDown={searchHandler}
      />
      <IoIosOptions className="search-options" />
    </div>
  );
}

export default SearchBar;
