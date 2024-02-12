import { FormattedSession } from "./HistorySessionsList";
import { formatTime } from "./StatsSummary";
import "./HistoryListItem.css";
export interface ListItemProps {
  session: FormattedSession;
}
function ListItem({ session }: ListItemProps) {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th rowSpan={2}>{formatDate(session.date)}</th>
            <th>{session.rounds.length}</th>
            <th>{formatTime(session.avgRound)}</th>
            <th>{formatTime(session.maxRound)}</th>
          </tr>
          <tr>
            <td>Rounds</td>
            <td>Average</td>
            <td>Max</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ListItem;

export function formatDate(dateString: string) {
  const date = new Date(Number(dateString));
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based in JavaScript
  return `${day}/${month}`;
}
