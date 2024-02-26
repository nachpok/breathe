import { useEffect, useState } from "react";
import { ButtonLink } from "./HomePage";
import { LeftOutlined } from "@ant-design/icons";
import { useAuth } from "./AuthAndLogin/AuthContext";
import { Session } from "../../drizzle/migrations/schema";
import StatsSummary from "./StatsSummary";
import HistorySessionsList from "./HistorySessionsList";
import "./History.css";
import { deleteSession, readSessions } from "../drizzle";
import LoadingPage from "./LoadingPage";

export interface FormattedSession {
  id: string;
  rounds: number[];
  avgRound: number;
  maxRound: number;
  date: string;
}

function History() {
  const { currentUser } = useAuth();
  const [sessions, setSessions] = useState<FormattedSession[]>([]);
  const [loading, setLoading] = useState(true);
  const getSession = () => {
    return readSessions(`BU-${currentUser.uid}`);
  };
  const removeSession = (sessionId: string) => {
    const newSessionList = sessions.filter((s) => s.id !== sessionId);
    deleteSession(sessionId);
    setSessions(newSessionList);
  };
  useEffect(() => {
    const fetchSessions = async () => {
      const res = await getSession();
      if (res?.length) {
        const sessions = res as Session[];
        const formattedSessions = formatSessions(sessions);
        setSessions(formattedSessions);
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
      <HistorySessionsList sessions={sessions} removeSession={removeSession} />
    </div>
  );
}

export default History;

function formatSessions(sessions: Session[]): FormattedSession[] {
  const formattedSessions: FormattedSession[] = [];
  sessions.forEach((s) => {
    if (s.rounds) {
      const roundsString = s.rounds.toString().split(",");
      const rounds = roundsString.map(Number);
      const maxRound = Math.max(...rounds);
      const totalRetentionTimeMS = rounds.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );

      const formattedSession: FormattedSession = {
        id: s.id,
        rounds: rounds,
        avgRound: totalRetentionTimeMS / rounds.length,
        maxRound: maxRound,
        date: s.timestamp,
      };

      formattedSessions.push(formattedSession);
    }
  });

  return formattedSessions;
}
