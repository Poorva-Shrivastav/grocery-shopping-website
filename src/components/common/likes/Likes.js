import React, { useContext } from "react";
import { BsFillHeartFill } from "react-icons/bs";
import "./Likes.css";
import { WishContext } from "../../../context/Context";

function Likes() {
  const { wish } = useContext(WishContext);

  return (
    <div className="cart-likes">
      <div>
        <BsFillHeartFill className="likes-heart-icon" />
        <div className="likes-badge">{wish !== undefined && wish.length}</div>
      </div>
    </div>
  );
}

export default Likes;
