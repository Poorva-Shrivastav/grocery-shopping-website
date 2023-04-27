import React from "react";
import { MenuItems } from "../../components/Constants";
import "./Home.css";
import ItemCard from "../../components/itemCard/ItemCard";

function Home({ filterHandler }) {
  const handleClick = (menu) => {
    filterHandler(menu);
  };

  return (
    <div className="home-outermost-div">
      <div className="home-outer-div">
        <div className="home-outer-div-menu">
          {MenuItems.map((menu, idx) => (
            <div
              className="home-filter-div"
              key={menu.id}
              onClick={() => handleClick(menu)}
            >
              {menu.name}
            </div>
          ))}
        </div>
      </div>
      <h2>Trending Items</h2>
      <ItemCard />
    </div>
  );
}

export default Home;
