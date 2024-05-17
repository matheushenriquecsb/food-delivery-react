import { useNavigate, useSearchParams } from "react-router-dom";
import "./VerifyOrder.css";
import axios from "axios";
import { useEffect } from "react";

const VerifyOrder = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();

  const verifyPayment = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/order/verify`,
      {
        success,
        orderId,
      }
    );

    if (res.data.success) {
      navigate("/my-orders");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default VerifyOrder;
