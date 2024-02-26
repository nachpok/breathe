import { Spin } from "antd";
import { ButtonLink } from "./HomePage";
import { LeftOutlined } from "@ant-design/icons";

function LoadingPage() {
  //Todo notify when there are no sessions
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 10 }}>
        <ButtonLink to="/" label={<LeftOutlined />} className="backButton" />
      </div>
      <Spin size="large" />
    </div>
  );
}

export default LoadingPage;
