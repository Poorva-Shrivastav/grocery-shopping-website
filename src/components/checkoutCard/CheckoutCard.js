import React, { useContext } from "react";
import "./CheckoutCard.css";
import { CartContext, ItemContext } from "../../context/Context";

function CheckoutCard() {
  const {
    cart,
    removeItemHandler,
    increaseCartItemHandler,
    decreaseCartItemHandler,
  } = useContext(CartContext);
  return (
    <div className="checkoutcard-outermost-div">
      {cart?.length > 0 &&
        cart.map((item, idx) => (
          <div key={item.id} className="checkoutcard-outer-div">
            <div className="checkoutcard-inner-div">
              <div style={{ width: "15vw" }}>
                <p>{item.name}</p>
                <p className="checkoutcard-inner-p">{item.id}</p>
              </div>
              <div className="checkoutcard-outer-itemnumber-div">
                <div className="checkoutcard-itemnumber-div">
                  <button
                    className={
                      item.quantity === 1
                        ? "checkoutcard-btn-disabled"
                        : "checkoutcard-btn"
                    }
                    onClick={() => decreaseCartItemHandler(item)}
                  >
                    -
                  </button>
                  <label>{item.quantity}</label>
                  <button
                    className="checkoutcard-btn"
                    style={{ background: "lightgreen" }}
                    onClick={() => increaseCartItemHandler(item)}
                  >
                    +
                  </button>
                </div>

                <p
                  className="checkoutcard-available-p"
                  style={{
                    background: item.available >= 10 ? "" : "orange",
                    display: item.available >= 10 ? "none" : "flex",
                  }}
                >
                  {item.available > 10
                    ? item.available
                    : `only ${item.available} left`}
                </p>
              </div>
              <div className="checkoutcard-price-div">
                <label className="checkoutcard-price">
                  £{Number(item.finalPrice).toFixed(2)}
                </label>
              </div>
              <button
                className="checkoutcard-btn checkoutcard-delete-btn"
                style={{ background: "lightgreen" }}
                onClick={() => removeItemHandler(item.id)}
              >
                x
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default CheckoutCard;
