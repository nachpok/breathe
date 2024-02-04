import Timer from "./Timer";
import { ButtonLink } from "./HomePage";
import "./RetentionTimer.css";
import { LeftOutlined } from "@ant-design/icons";
function RetentionTimer() {
  return (
    <div className="app">
      <ButtonLink to="/" label={<LeftOutlined />} className="backButton" />
      <Timer />
    </div>
  );
}

export default RetentionTimer;
