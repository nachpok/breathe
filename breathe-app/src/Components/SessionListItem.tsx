import { formatTime } from "./SessionsSummary";
import { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import DeleteItemModal from "./DeleteItemModal";
import { FormattedSession } from "./History";
export interface ListItemProps {
  session: FormattedSession;
  removeSession: (id: string) => void;
}
function SessionListItem({ session, removeSession }: ListItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleRemove = () => {
    removeSession(session.id);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <table style={{ padding: " 0 10px" }}>
        <tbody>
          <tr>
            <th rowSpan={2}>{formatDate(session.date)}</th>
            <th>{session.rounds.length}</th>
            <th>{formatTime(session.avgRound)}</th>
            <th>{formatTime(session.maxRound)}</th>
            <th>
              <DeleteOutlined onClick={() => showModal()} />
              <DeleteItemModal
                itemType="Session"
                isModalOpen={isModalOpen}
                handleOk={handleRemove}
                handleCancel={handleCancel}
                removeItem={removeSession}
              />
            </th>
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

export default SessionListItem;

export function formatDate(dateString: string) {
  const date = new Date(Number(dateString));
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based in JavaScript
  return `${day}/${month}`;
}
