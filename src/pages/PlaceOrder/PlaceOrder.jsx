import { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import "./PlaceOrder.css";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const { getTotalCartAmout, foodList, cartItems, token } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    foodList.map((item) => {
      if (cartItems[item.id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item.id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmout() + 2,
    };

    let res = await axios.post(
      `${import.meta.env.VITE_API_URL}/order`,
      { orderData },
      { headers: { token: token } }
    );

    if (res.data.success) {
      const { session_url } = res.data;
      window.location.replace(session_url);
    } else {
      return toast.error("Error: Something Wrong");
    }
  };

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            required
            placeholder="First Name"
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
          />
          <input
            type="text"
            required
            placeholder="Last Name"
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
          />
        </div>
        <input
          type="email"
          required
          placeholder="Email address"
          className="email"
          name="email"
          autoComplete="off"
          onChange={onChangeHandler}
          value={data.email}
        />
        <input
          type="text"
          required
          placeholder="Street"
          className="street"
          name="street"
          onChange={onChangeHandler}
          value={data.street}
        />
        <div className="multi-fields">
          <input
            type="text"
            required
            placeholder="City"
            name="city"
            onChange={onChangeHandler}
            value={data.city}
          />
          <input
            type="text"
            required
            placeholder="State"
            name="state"
            onChange={onChangeHandler}
            value={data.state}
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            required
            placeholder="Zip Code"
            name="zipCode"
            onChange={onChangeHandler}
            value={data.zipCode}
          />
          <input
            type="text"
            required
            placeholder="Country"
            name="country"
            autoComplete="off"
            onChange={onChangeHandler}
            value={data.country}
          />
        </div>
        <input
          type="text"
          required
          placeholder="Phone"
          className="phone"
          name="phone"
          autoComplete="off"
          onChange={onChangeHandler}
          value={data.phone}
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>R$ {getTotalCartAmout()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>R$ {2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>R$ {getTotalCartAmout() + 2}</p>
            </div>
          </div>
          <button>Proceed To Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
