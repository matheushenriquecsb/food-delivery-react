import { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import Loading from "../Loading/Loading";

const FoodDisplay = ({ category }) => {
  const { foodList, loading } = useContext(StoreContext);
  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      {loading ? (
        <Loading />
      ) : (
        <div className="food-display-list">
          {foodList.map((item, index) => {
            if (category === "All" || category === item.category) {
              return (
                <FoodItem
                  key={index}
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
