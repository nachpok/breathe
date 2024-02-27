import { List } from "antd";
import VirtualList from "rc-virtual-list";
import MeditationListItem from "./MeditationListItem";
import { Meditation } from "../../drizzle/migrations/schema";

interface MeditationListProps {
  meditations: Meditation[];
  removeMeditation: (sessionId: string) => void;
}

export function MeditationList({
  meditations,
  removeMeditation,
}: MeditationListProps) {
  const ContainerHeight = 300;
  return (
    <List className="list-container">
      <VirtualList
        data={meditations}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="id"
      >
        {(meditations, index: number) => (
          <List.Item key={index}>
            <List.Item.Meta
              description={
                <MeditationListItem
                  meditation={meditations}
                  removeMeditation={removeMeditation}
                />
              }
            />
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
}

export default MeditationList;
