import { List } from "antd";
import VirtualList from "rc-virtual-list";
import SessionListItem from "./SessionListItem";

import { FormattedSession } from "./History";
export interface SessionsListProps {
  sessions: FormattedSession[];
  removeSession: (sessionId: string) => void;
}

function SessionsList({ sessions, removeSession }: SessionsListProps) {
  //TODO Adjust height to screen size
  const ContainerHeight = 300;
  //Todo removed session animation

  // useEffect(() => {}, [sessions]);
  return (
    <List className="list-container">
      <VirtualList
        data={sessions}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="id"
      >
        {(sessionList: FormattedSession, index: number) => (
          <List.Item key={index}>
            <List.Item.Meta
              description={
                <SessionListItem
                  session={sessionList}
                  removeSession={removeSession}
                />
              }
            />
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
}

export default SessionsList;

// function formatSessions(sessions: Session[]): FormattedSession[] {
//   const formattedSessions: FormattedSession[] = [];
//   sessions.forEach((s) => {
//     if (s.rounds) {
//       const roundsString = s.rounds.toString().split(",");
//       const rounds = roundsString.map(Number);
//       const maxRound = Math.max(...rounds);
//       const totalRetentionTimeMS = rounds.reduce(
//         (accumulator, currentValue) => accumulator + currentValue,
//         0
//       );

//       const formattedSession: FormattedSession = {
//         id: s.id,
//         rounds: rounds,
//         avgRound: totalRetentionTimeMS / rounds.length,
//         maxRound: maxRound,
//         date: s.timestamp,
//       };

//       formattedSessions.push(formattedSession);
//     }
//   });

//   return formattedSessions;
// }
