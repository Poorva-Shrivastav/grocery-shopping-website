import React from "react";
import "./Header.css";
import Likes from "../likes/Likes";
import Cart from "../cart/Cart";
import avatar from "../../../images/avatar.png";
import SearchBar from "../../SearchBar/SearchBar";

function Header() {
  //common component across the project
  return (
    <div className="header-outermost-div">
      <h3 className="header-h3">GROCERIES</h3>
      <SearchBar />
      <Likes />
      <img src={avatar} alt="avatar" className="header-img" />
      <Cart />
    </div>
  );
}

export default Header;
