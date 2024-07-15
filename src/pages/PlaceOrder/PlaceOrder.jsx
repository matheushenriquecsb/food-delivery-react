import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import "./PlaceOrder.css";
import { LoadingOutlined } from "@ant-design/icons";

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
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    let res = await axios.post(
      "https://food-app-backend.adaptable.app/order",
      { orderData },
      { headers: { token: token } }
    );

    if (res.data.success) {
      setLoading(false);
      const { session_url } = res.data;
      window.location.replace(session_url);
    } else {
      setLoading(false);
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
        <p className="title">Informações de Entrega</p>
        <div className="multi-fields">
          <input
            type="text"
            required
            placeholder="Nome"
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
          />
          <input
            type="text"
            required
            placeholder="Sobrenome"
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
          />
        </div>
        <input
          type="email"
          required
          placeholder="Email"
          className="email"
          name="email"
          autoComplete="off"
          onChange={onChangeHandler}
          value={data.email}
        />
        <input
          type="text"
          required
          placeholder="Rua"
          className="street"
          name="street"
          onChange={onChangeHandler}
          value={data.street}
        />
        <div className="multi-fields">
          <input
            type="text"
            required
            placeholder="Cidade"
            name="city"
            onChange={onChangeHandler}
            value={data.city}
          />
          <input
            type="text"
            required
            placeholder="Estado"
            name="state"
            onChange={onChangeHandler}
            value={data.state}
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            required
            placeholder="CEP"
            name="zipCode"
            onChange={onChangeHandler}
            value={data.zipCode}
          />
          <input
            type="text"
            required
            placeholder="País"
            name="country"
            autoComplete="off"
            onChange={onChangeHandler}
            value={data.country}
          />
        </div>
        <input
          type="text"
          required
          placeholder="Celular"
          className="phone"
          name="phone"
          autoComplete="off"
          onChange={onChangeHandler}
          value={data.phone}
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Valor do Pedido</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>R$ {getTotalCartAmout()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Taxa de Entrega</p>
              <p>R$ {2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>R$ {getTotalCartAmout() + 2}</p>
            </div>
          </div>
          <button>
            {loading ? <LoadingOutlined /> : "Siga para o pagamento"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
