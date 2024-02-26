import { List } from "antd";
import VirtualList from "rc-virtual-list";
import { Session } from "../../drizzle/migrations/schema";
import "./HistorySessionList.css";
import ListItem from "./HistoryListItem";
import { useEffect, useState } from "react";
import { deleteSession } from "../drizzle";
export interface SessionsListProps {
  sessions: Session[];
}
export interface FormattedSession {
  id: string;
  rounds: number[];
  avgRound: number;
  maxRound: number;
  date: string;
}

function HistorySessionsList({ sessions }: SessionsListProps) {
  //TODO Adjust height to screen size
  const ContainerHeight = 300;
  const formattedSession = formatSessions(sessions);
  const [sessionList, setSessionList] =
    useState<FormattedSession[]>(formattedSession);
  //Todo removed session animation
  const removeSession = (sessionId: string) => {
    const newSessionList = sessionList.filter((s) => s.id !== sessionId);
    deleteSession(sessionId);
    setSessionList(newSessionList);
  };
  useEffect(() => {}, [sessionList]);
  return (
    <List className="list-container">
      <VirtualList
        data={sessionList}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="id"
      >
        {(sessionList: FormattedSession, index: number) => (
          <List.Item key={index}>
            <List.Item.Meta
              description={
                <ListItem session={sessionList} removeSession={removeSession} />
              }
            />
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
}

export default HistorySessionsList;

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
