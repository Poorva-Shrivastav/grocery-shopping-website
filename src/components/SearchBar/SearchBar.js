import React, { useContext } from "react";
import "./SearchBar.css";
import { IoIosOptions } from "react-icons/io";
import { SearchItemContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const { onChangeHandler, inputVal } = useContext(SearchItemContext);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    onChangeHandler(e);
    navigate("/");
  };
  return (
    <div className="search-outermost-div">
      <input
        type="search"
        placeholder="Search"
        value={inputVal || ""}
        onChange={(e) => changeHandler(e)}
      />
      <IoIosOptions className="search-options" />
    </div>
  );
}

export default SearchBar;
