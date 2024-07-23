import axios from "axios";
import { useContext, useState } from "react";

import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import "./Login.css";
import { LoadingOutlined } from "@ant-design/icons";

const Login = ({ setShowLogin }) => {
  const { setToken } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const signUpUser = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "https://food-app-backend.adaptable.app/users/register",
        data
      );
      setLoading(false);
      if (res.status === 201) {
        setCurrState("Login");
      }
    } catch (error) {
      setLoading(false);
      if (Array.isArray(error.response.data.message)) {
        error.response.data.message.forEach((errMsg) => {
          return toast.error(errMsg);
        });
      }
      return toast.error(error.response.data.message);
    }
  };

  const loginUser = async () => {
    try {
      const res = await axios.post(
        "https://food-app-backend.adaptable.app/users/login",
        [data.email, data.password]
      );

      if (res.status === 201) {
        setToken(res.data.access_token);
        localStorage.setItem("token", res.data.access_token);
        setShowLogin(false);
      }
    } catch (error) {
      return toast.error(error.response.data.message);
    }
  };

  const onLogin = async (e) => {
    e.preventDefault();
    if (currState === "Sign Up") {
      await signUpUser();
    } else {
      await loginUser();
    }
  };

  return (
    <div className="login">
      <form action="post" onSubmit={onLogin} className="login-container">
        <div className="login-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="close-popup"
          />
        </div>
        <div className="login-inputs">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              placeholder="Seu Nome"
              required
            />
          )}

          <input
            type="email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            placeholder="Seu Email"
            required
          />
          <input
            type="password"
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            placeholder="Sua Senha"
            required
          />
        </div>
        <button type="submit">
          {loading ? (
            <LoadingOutlined />
          ) : currState === "Sign Up" ? (
            "Create Account"
          ) : (
            "Login"
          )}
        </button>
        <div className="login-condition">
          <input type="checkbox" required />
          <p>
            Ao continuar, concordo com os termos de uso e política de
            privacidade
          </p>
        </div>
        {currState === "Login" ? (
          <p>
            Ainda não possui uma conta?
            <span onClick={() => setCurrState("Sign Up")}> Clique aqui</span>
          </p>
        ) : (
          <p>
            Já possui uma conta?
            <span onClick={() => setCurrState("Login")}> Faça login aqui</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
