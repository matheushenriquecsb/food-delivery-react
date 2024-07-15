import { useContext, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import "./Cart.css";
import { LoadingOutlined } from "@ant-design/icons";

const Cart = () => {
  const { foodList, cartItems, removeFromCart, getTotalCartAmout, token } =
    useContext(StoreContext);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleCartItems = async () => {
    if (!token) {
      return toast.error("Your are not authorized, please login");
    }
    setLoading(true);
    const res = await axios.post(
      "https://food-app-backend.adaptable.app/cart/add",
      { cartItems },
      { headers: { token: token } }
    );
    setLoading(false);

    if (res.data.error) {
      setLoading(false);
      return toast.error("The card is empty! Please insert any item");
    }

    navigate("/order");
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Pratos</p>
          <p>Preço</p>
          <p>Quantidade</p>
          <p>Total</p>
          <p>Remover</p>
        </div>
        <br />
        <hr />
        {foodList.map((item, index) => {
          if (cartItems[item.id] > 0) {
            return (
              <div className="cart-items-title cart-items-item" key={index}>
                <img
                  src={`https://food-app-backend.adaptable.app/uploads/${item.image}`}
                  alt="food"
                />
                <p>{item.name}</p>
                <p>R$ {item.price}</p>
                <p>{cartItems[item.id]}</p>
                <p>{item.price * cartItems[item.id]}</p>
                <p onClick={() => removeFromCart(item.id)} className="cross">
                  x
                </p>
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Valores Carrinho</h2>
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
          <button onClick={handleCartItems}>
            {loading ? <LoadingOutlined /> : "Seguir com o pedido"}
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>Insira aqui seu código promocional</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="código promocional" />
              <button>Enviar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
