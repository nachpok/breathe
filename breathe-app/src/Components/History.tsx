import { useEffect, useState } from "react";
import { ButtonLink } from "./HomePage";
import { LeftOutlined } from "@ant-design/icons";
import { useAuth } from "./AuthAndLogin/AuthContext";
import { Session } from "../../drizzle/migrations/schema";
import StatsSummary from "./StatsSummary";
import HistorySessionsList from "./HistorySessionsList";
import "./History.css";
import { readSessions } from "../drizzle";
import LoadingPage from "./LoadingPage";
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
      console.log("History.getSessions.res", res);
      if (res?.length) {
        const sessions = res as Session[];
        setSessions(sessions);
        setLoading(false); // Set loading to false when data is fetched
      }
    };
    fetchSessions();
  }, []);

  if (loading) {
    return <LoadingPage />;
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
