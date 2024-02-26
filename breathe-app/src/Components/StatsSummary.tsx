import { Session } from "../../drizzle/migrations/schema";
import "./StatsSummary.css";
export interface StatsSummaryProps {
  sessions: Session[];
}

interface SessionsSummary {
  numOfSessions: number;
  numOfRounds: number;
  longestRound: number;
  totalRetentionTimeMS: number;
  avgRetentionMS: number;
}
//TODO avoid / by 0, show no stats
function StatsSummary({ sessions }: StatsSummaryProps) {
  const numOfSessions = sessions.length;
  if (numOfSessions === 0) {
    return <>NO SESSIONS</>;
  }

  const summary = extractStatistics(sessions);

  return (
    <div className="summary-container">
      <div className="bar-label-container">
        <span className="bar-label">Average retention</span>
        <span className="bar-label">Longest round</span>
      </div>
      <div className="retention-var">
        <div className="avg-bar">
          <span className="bar-text">{formatTime(summary.avgRetentionMS)}</span>
        </div>
        <div className="max-bar">
          <span className="bar-text">{formatTime(summary.longestRound)}</span>
        </div>
      </div>

      <table>
        <tbody>
          <tr>
            <td>
              <span className="summary-value">{summary.numOfSessions}</span>
            </td>
            <td>
              <span className="summary-value">{summary.numOfRounds}</span>
            </td>
            <td>
              <span className="summary-value">
                {formatTime(summary.totalRetentionTimeMS)}
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <span className="summary-label">Breathing sessions</span>
            </td>
            <td>
              <span className="summary-label">Total rounds</span>
            </td>
            <td>
              <span className="summary-label">Total retention time</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default StatsSummary;

function extractStatistics(sessions: Session[]): SessionsSummary {
  const numOfSessions = sessions.length;
  let roundsString: string[] = [];
  sessions.forEach((s) => {
    if (s.rounds !== null) {
      const roundsNumbers = s.rounds.toString().split(",");
      roundsString = roundsString.concat(roundsNumbers);
    }
  });
  const rounds = roundsString.map(Number);

  const numOfRounds = rounds.length;
  const longestRound = Math.max(...rounds);
  const totalRetentionTimeMS = rounds.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const avgRetentionMS = totalRetentionTimeMS / numOfRounds;

  return {
    numOfSessions: numOfSessions,
    numOfRounds: numOfRounds,
    longestRound: longestRound,
    totalRetentionTimeMS: totalRetentionTimeMS,
    avgRetentionMS: avgRetentionMS,
  };
}

export const formatTime = (milliseconds: number): string => {
  const minutes: number = Math.floor(milliseconds / 60000);
  const seconds: number = Math.round((milliseconds % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
