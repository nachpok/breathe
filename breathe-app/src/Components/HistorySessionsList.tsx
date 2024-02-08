import { List } from "antd";
import VirtualList from "rc-virtual-list";
import { Session } from "../drizzle/schema";
import "./HistorySessionList.css";
import ListItem from "./HistoryListItem";
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

  return (
    <List className="list-container">
      <VirtualList
        data={formattedSession}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="id"
      >
        {(formattedSession: FormattedSession, index: number) => (
          <List.Item key={index}>
            <List.Item.Meta
              description={<ListItem session={formattedSession} />}
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
        date: s.createdAt,
      };

      formattedSessions.push(formattedSession);
    }
  });

  return formattedSessions;
}
