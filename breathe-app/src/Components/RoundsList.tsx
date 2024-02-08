import { List } from "antd";
import React from "react";
import VirtualList from "rc-virtual-list";
interface RoundsListProps {
  rounds: number[];
}

export const RoundsList: React.FC<RoundsListProps> = ({ rounds }) => {
  if (rounds.length === 0) {
    return <></>;
  }
  const ContainerHeight = 180;

  return (
    <>
      <List>
        <VirtualList
          data={rounds}
          height={ContainerHeight}
          itemHeight={47}
          itemKey={(index: number) => index.toString()}
          style={{ width: "300px" }}
        >
          {(item: number, index: number) => (
            <List.Item key={index}>
              <List.Item.Meta
                description={
                  <div key={index}>
                    <p>
                      Round {index + 1}
                      <span style={{ paddingLeft: "180px" }}></span>
                      {formatRound(item)}
                    </p>
                  </div>
                }
              />
            </List.Item>
          )}
        </VirtualList>
      </List>
    </>
  );
};
const formatRound = (time: number) => {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  return `${minutes.toString().padStart(1, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};
