import React, { useContext, useState } from "react";
import { BsFillHeartFill } from "react-icons/bs";
import "./Likes.css";
import { WishContext } from "../../../context/Context";
import LikesModal from "./LikesModal";

function Likes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { wish } = useContext(WishContext);

  //we can build a modal to show the items under likes
  // const modalHandler = () => {
  //   setIsModalOpen(!isModalOpen);
  // };

  return (
    <div className="cart-likes">
      <div>
        <BsFillHeartFill
          className="likes-heart-icon"
          // onClick={modalHandler}
        />
        <div className="likes-badge">{wish !== undefined && wish.length}</div>
        {/* {isModalOpen && <LikesModal />} */}
      </div>
    </div>
  );
}

export default Likes;
