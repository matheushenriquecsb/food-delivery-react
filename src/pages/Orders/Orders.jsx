import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import "./Orders.css";

const Orders = () => {
  const { token } = useContext(StoreContext);

  const [data, setData] = useState([]);

  const fetchOrder = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/order/my-orders`,
      {},
      { headers: { token: token } }
    );
    setData(Array(res.data));
  };

  useEffect(() => {
    if (token) {
      fetchOrder();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h1>My Orders</h1>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.orderData.orderData.items.map((i, index) => {
                  if (index === order.orderData.orderData.items.length - 1) {
                    return i.name + " X " + i.quantity;
                  } else {
                    return i.name + " X " + i.quantity;
                  }
                })}
              </p>
              <p>${order.orderData.orderData.amount}.00</p>
              <p>Items: {order.orderData.orderData.items.length}</p>
              <p>
                <span>&#x25cf;</span>
                <b> {order.status}</b>
              </p>
              <button>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
