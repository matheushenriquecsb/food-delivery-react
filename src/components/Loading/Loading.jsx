import { LoadingOutlined } from "@ant-design/icons";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <LoadingOutlined className="loading-icon" />
    </div>
  );
};

export default Loading;
