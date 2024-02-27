import { formatTime } from "./SessionsSummary";
import { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import DeleteItemModal from "./DeleteItemModal";
import { Meditation } from "../../drizzle/migrations/schema";
import { formatDate } from "./SessionListItem";

export interface ListItemProps {
  meditation: Meditation;
  removeMeditation: (id: string) => void;
}

function MeditationListItem({ meditation, removeMeditation }: ListItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleRemove = () => {
    removeMeditation(meditation.id);
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
            <th style={{ width: "30vw" }}>
              {formatDate(meditation.timestamp)}
            </th>
            <th style={{ width: "30vw" }}>
              {formatTime(meditation.milliseconds)}
            </th>
            <th style={{ width: "30vw" }}>
              <DeleteOutlined onClick={() => showModal()} />
              <DeleteItemModal
                itemType="Session"
                isModalOpen={isModalOpen}
                handleOk={handleRemove}
                handleCancel={handleCancel}
                removeItem={removeMeditation}
              />
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MeditationListItem;
