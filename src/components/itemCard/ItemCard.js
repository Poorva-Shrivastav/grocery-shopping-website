import React, { useContext } from "react";
import "./ItemCard.css";
import { FaHeart } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ItemContext, CartContext, WishContext } from "../../context/Context";

function ItemCard() {
  const { itemList } = useContext(ItemContext);
  const { wish, addToWishHandler } = useContext(WishContext);
  const { cart, addToCartHandler } = useContext(CartContext);

  const navigate = useNavigate();

  const navigateHandler = () => navigate("/checkout");

  const wishListHandler = (item) => {
    addToWishHandler(item);
  };

  return (
    <div className="itemcard-outermost-div">
      {itemList?.length > 0 &&
        itemList.map((item, idx) => (
          <div key={item.id} className="itemcard-outer-div">
            <img className="itemcard-img" src={item.img} alt="item" />
            <div className="itemcard-inner-div">
              <p>{item.name}</p>
              <p className="itemcard-inner-p">{item.description}</p>
              <button
                className="itemcard-inner-btn"
                onClick={() => addToCartHandler(item)}
                style={{ background: item.available >= 10 ? "" : "orange" }}
              >
                {item.available >= 10
                  ? "Available"
                  : `only ${item.available} left`}
              </button>
              <div className="itemcard-price-div">
                <label className="itemcard-price">{item.price}</label>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <>
                    <IoMdCart
                      onClick={() => addToCartHandler(item)}
                      style={{ cursor: "pointer" }}
                    />
                    <div
                      className={
                        cart !== undefined && cart.includes(item)
                          ? "itemcard-badge"
                          : "display-none"
                      }
                    >
                      {cart !== undefined &&
                        cart.includes(item) &&
                        item.quantity}
                    </div>
                  </>
                  <FaHeart
                    onClick={() => wishListHandler(item)}
                    color={[...wish].includes(item) ? "#e86f6f" : ""}
                    style={{ cursor: "pointer", marginLeft: "10px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ItemCard;
