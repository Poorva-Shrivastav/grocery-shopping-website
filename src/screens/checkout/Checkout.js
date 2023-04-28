import React, { useEffect, useState } from "react";
import CheckoutCard from "../../components/checkoutCard/CheckoutCard";
import "./Checkout.css";
import { useNavigate } from "react-router-dom";
import { IoIosAddCircleOutline, IoIosArrowBack } from "react-icons/io";

function Checkout({ cart, subtotal }) {
  const navigate = useNavigate();

  const navigateHandler = () => navigate("/");

  const finalSubmitHandler = () => {
    alert("Thank you for shopping with us!");
    navigate("/");
  };

  return (
    <div className="checkout-outermost-div">
      <IoIosArrowBack className="checkout-goBack" onClick={navigateHandler} />
      <h2>Checkout</h2>
      {cart && cart.length > 0 ? (
        <>
          <CheckoutCard />
          <div className="grid-container">
            <div className="grid-item" style={{ color: "black" }}>
              Subtotal
            </div>
            <div className="grid-item">£{Number(subtotal).toFixed(2)}</div>
            <div className="grid-item"> </div>
            <div className="grid-item" style={{ color: "black" }}>
              Discount
            </div>
            <div className="grid-item">£0.00</div>
            <div className="grid-item"> </div>
            <div className="grid-item" style={{ color: "black" }}>
              Total
            </div>
            <div className="grid-item">£{Number(subtotal).toFixed(2)}</div>
            <div className="grid-item">
              <button className="checkout-btn" onClick={finalSubmitHandler}>
                Checkout
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="checkout-empty">
          <h3>Your cart is empty!</h3>
        </div>
      )}
    </div>
  );
}

export default Checkout;
