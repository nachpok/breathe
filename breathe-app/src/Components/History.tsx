import { useEffect, useState } from "react";
import { ButtonLink } from "./HomePage";
import { LeftOutlined } from "@ant-design/icons";
import { useAuth } from "./AuthAndLogin/AuthContext";
import { Session } from "../drizzle/schema";
import { readSessions } from "../drizzle";
import StatsSummary from "./StatsSummary";
import HistorySessionsList from "./HistorySessionsList";
import "./History.css";
import { Spin } from "antd";
function History() {
  const { currentUser } = useAuth();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const getSession = () => {
    return readSessions(`BU-${currentUser.uid}`);
  };
  useEffect(() => {
    const fetchSessions = async () => {
      const res = await getSession();
      if (res?.length) {
        setSessions(res);
        setLoading(false); // Set loading to false when data is fetched
      }
    };
    fetchSessions();
  }, []);

  if (loading) {
    return <Spin size="large" style={{ marginTop: "300px" }} />;
  }
  return (
    <div className="app">
      <ButtonLink to="/" label={<LeftOutlined />} className="backButton" />
      <h1 style={{ textAlign: "center" }}>Results</h1>
      <StatsSummary sessions={sessions} />
      <HistorySessionsList sessions={sessions} />
    </div>
  );
}

export default History;
