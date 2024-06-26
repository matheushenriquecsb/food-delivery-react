import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import VerifyOrder from "./pages/Verify/VerifyOrder";
import Orders from "./pages/Orders/Orders";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <ToastContainer />
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<VerifyOrder />} />
          <Route path="/my-orders" element={<Orders />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
