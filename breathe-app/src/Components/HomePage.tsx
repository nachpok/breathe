import { Button } from "antd";
import React from "react";
// import { Link } from "react-router-dom";
import { useAuth } from "./AuthAndLogin/AuthContext";
import { Link } from "react-router-dom";
import "./HomePage.css";
const HomePage: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const handleLogOut = async () => {
    try {
      await logout();
    } catch (e) {}
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h3>Welcome {currentUser.email.split("@")[0]}</h3>
      <div className="menu-button-container">
        <ButtonLink
          className="menu-button"
          to="/meditation"
          label="Meditation"
        />
        <ButtonLink
          className="menu-button"
          to="/retention"
          label="Retention Timer"
        />
        <ButtonLink className="menu-button" to="/history" label="History" />
      </div>
      <Button className="logout-button" onClick={handleLogOut}>
        Log out
      </Button>
    </div>
  );
};

export default HomePage;

export const ButtonLink: React.FC<{
  to: string;
  label: string | React.ReactNode;
  className?: string;
  disabled?: boolean;
  shape?: "default" | "circle" | "round";
  style?: React.CSSProperties;
}> = ({ to, label, className, disabled, shape }) => {
  return (
    <Button className={className} disabled={disabled} shape={shape}>
      <Link to={to} style={{ whiteSpace: "normal" }}>
        <span style={{ fontSize: "20px", fontWeight: "bold" }}>{label}</span>
      </Link>
    </Button>
  );
};
