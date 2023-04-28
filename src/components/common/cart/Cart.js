import React, { useContext } from "react";
import "./Cart.css";
import { IoMdCart } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../context/Context";

function Cart() {
  const { cart } = useContext(CartContext);

  const navigate = useNavigate();

  const navigateHandler = () => navigate("/checkout");

  return (
    <div className="cart" onClick={navigateHandler}>
      <IoMdCart className="cart-icon" />
      <div className="badge">{cart !== undefined && cart.length}</div>
    </div>
  );
}

export default Cart;
