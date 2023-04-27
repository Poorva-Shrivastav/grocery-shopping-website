import "./App.css";
import Header from "./components/common/Header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/home/Home";
import Checkout from "./screens/checkout/Checkout";
import { useEffect, useState } from "react";
import { CoffeeOffer } from "./components/Constants";
import {
  ItemContext,
  SearchItemContext,
  CartContext,
  WishContext,
} from "./context/Context";

function App() {
  const [respData, setRespData] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [cart, setCart] = useState([]);
  const [wish, setWish] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const [flag, setFlag] = useState(false);
  const [subtotal, setSubtotal] = useState(0.0);

  useEffect(() => {
    fetch(
      "https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s?category=all"
    )
      .then((res) => res.json())
      .then((data) => {
        let newData =
          data &&
          data.map((item) => ({
            ...item,
            quantity: 1,
            finalPrice: Number(item.price.replace(/£/g, "")),
          }));
        setItemList(newData);
        setRespData(newData);
      });
  }, []);

  const onChangeHandler = (e) => {
    setInputVal(e.target.value);
  };

  const subTotalHandler = () => {
    const price = cart.map((item) => item.finalPrice);
    const finalPrice = price.reduce((total, item) => total + item, 0);
    Number(finalPrice).toFixed(2);
    return setSubtotal(finalPrice);
  };

  const addToCartHandler = (item) => {
    const index = cart.findIndex((product) => product.id === item.id);
    const newPrice = item.price.replace(/£/g, "");
    if (index > -1) {
      let newCart = cart;
      newCart[index].quantity += 1;
      newCart[index].finalPrice = newPrice * newCart[index].quantity;
      setCart(newCart);

      handleOffers(item);
      setFlag(true);
    } else {
      setCart([...cart, item]);
      setFlag(true);
    }
  };

  const addToWishHandler = (prod) => {
    if (!wish.includes(prod)) {
      setWish([...wish, prod]);
    } else {
      setWish([...wish.filter((item) => item.id !== prod.id)]);
    }
  };

  const searchHandler = (e) => {
    if (e.key === "Enter") {
      if (inputVal !== "") {
        const newList = itemList.filter((x) =>
          x.name.toLowerCase().includes(inputVal)
        );
        setItemList(newList);
      } else {
        setItemList(respData);
        setInputVal("");
      }
    }
  };

  const filterHandler = (menu) => {
    if (menu.type !== "") {
      const newList = respData.filter((item) => item.type === menu.type);
      setItemList(newList);
    } else setItemList(respData);
  };

  const removeItemHandler = (idx) => {
    const newList = cart.filter((item) => item.id !== idx);
    setCart(newList);
    setFlag(true);
  };

  const increaseCartItemHandler = (item) => {
    if (item.quantity < item.available) {
      const index = cart.findIndex((product) => product.id === item.id);
      const newPrice = item.price.replace(/£/g, "");
      if (index > -1) {
        let newCart = cart;
        newCart[index].quantity += 1;
        newCart[index].finalPrice = newPrice * newCart[index].quantity;
        setCart(newCart);
        handleOffers(item);
        setFlag(true);
      }
    }
  };

  const decreaseCartItemHandler = (item) => {
    const index = cart.findIndex((product) => product.id === item.id);
    const newPrice = item.price.replace(/£/g, "");
    if (index > -1) {
      let newCart = cart;
      if (newCart[index].quantity > 1) {
        newCart[index].quantity -= 1;
        newCart[index].finalPrice = newPrice * newCart[index].quantity;
        setCart(newCart);
        setFlag(true);
      }
    }
  };

  const handleOffers = (item) => {
    if (item.name === "Coca-Cola" && item.quantity % 6 === 0) {
      if (item.quantity < item.available - 1) {
        const index = cart.findIndex((product) => product.id === item.id);
        if (index > -1) {
          let newCart = cart;
          newCart[index].quantity += 1;
          setCart(newCart);
          setFlag(true);
        }
      }
    }
    if (item.name === "Croissants" && item.quantity % 3 === 0) {
      if (item.quantity < item.available) {
        cart.map((product) => {
          let findObj = Object.values(product).indexOf("Coffee") >= 0;
          if (findObj) {
            const index = cart.findIndex(
              (product) => product.id === CoffeeOffer.id
            );
            if (index > -1) {
              let newCart = cart;
              newCart[index].quantity += 1;
              setCart(newCart);
              setFlag(true);
            }
          } else {
            console.log("not found");
          }
        });
      }
    }
  };

  useEffect(() => {
    setFlag(false);
    subTotalHandler();
  }, [flag]);

  return (
    <Router>
      <ItemContext.Provider
        value={{
          itemList,
        }}
      >
        <CartContext.Provider
          value={{
            cart,
            addToCartHandler,
            removeItemHandler,
            increaseCartItemHandler,
            decreaseCartItemHandler,
          }}
        >
          <WishContext.Provider value={{ wish, addToWishHandler }}>
            <SearchItemContext.Provider
              value={{ inputVal, onChangeHandler, searchHandler }}
            >
              <Header />
            </SearchItemContext.Provider>
            <Routes>
              <Route
                path="/"
                element={<Home filterHandler={filterHandler} />}
              />
              <Route
                path="/checkout"
                element={<Checkout cart={cart} subtotal={subtotal} />}
              />
            </Routes>
          </WishContext.Provider>
        </CartContext.Provider>
      </ItemContext.Provider>
    </Router>
  );
}

export default App;
