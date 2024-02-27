import { useEffect, useState } from "react";
import { ButtonLink } from "./HomePage";
import { LeftOutlined } from "@ant-design/icons";
import { useAuth } from "./AuthAndLogin/AuthContext";
import { Meditation, Session } from "../../drizzle/migrations/schema";
import SessionsSummary from "./SessionsSummary";
import SessionsList from "./SessionsList";
import "./History.css";
import {
  deleteMeditation,
  deleteSession,
  readMeditations,
  readSessions,
} from "../drizzle";
import LoadingPage from "./LoadingPage";
import { Tabs } from "antd";
import MeditationSummary from "./MeditationSummary";
import MeditationList from "./MeditationList";
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
  const [meditations, setMeditations] = useState<Meditation[]>([]);
  const [loading, setLoading] = useState(true);
  const getSession = () => {
    return readSessions(`BU-${currentUser.uid}`);
  };
  const getMeditations = () => {
    return readMeditations(`BU-${currentUser.uid}`);
  };
  const removeSession = (sessionId: string) => {
    const newSessionList = sessions.filter((s) => s.id !== sessionId);
    deleteSession(sessionId);
    setSessions(newSessionList);
  };
  const removeMeditation = (meditationId: string) => {
    const newMeditationList = meditations.filter((s) => s.id !== meditationId);
    deleteMeditation(meditationId);
    setMeditations(newMeditationList);
  };
  useEffect(() => {
    const fetchHistory = async () => {
      const sessions = (await getSession()) as Session[];
      const meditations = (await getMeditations()) as Meditation[];
      console.log("meditations: ", meditations);
      const formattedSessions = formatSessions(sessions);
      setSessions(formattedSessions);
      setMeditations(meditations);
      setLoading(false); // Set loading to false when data is fetched
    };
    fetchHistory();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  const TabItems = [
    {
      label: "Retention",
      key: "1",
      children: (
        <>
          <SessionsSummary sessions={sessions} />
          <SessionsList sessions={sessions} removeSession={removeSession} />
        </>
      ),
    },
    {
      label: "Meditation",
      key: "2",
      children: (
        <>
          <MeditationSummary meditations={meditations} />
          <MeditationList
            meditations={meditations}
            removeMeditation={removeMeditation}
          />
        </>
      ),
    },
  ];
  return (
    <div className="app">
      <ButtonLink to="/" label={<LeftOutlined />} className="backButton" />
      <Tabs type="card" items={TabItems} centered />
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
