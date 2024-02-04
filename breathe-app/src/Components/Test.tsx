import { Bar } from "@ant-design/charts";
const Test = () => {
  const data = [
    {
      instrument: "drums",
      value: 5,
      type: "boys",
    },
    {
      instrument: "bass",
      value: 9,
      type: "boys",
    },
    {
      instrument: "ukelele",
      value: 2,
      type: "boys",
    },
    {
      instrument: "cymbals",
      value: 3,
      type: "boys",
    },
    {
      instrument: "lead",
      value: 7,
      type: "boys",
    },
    {
      instrument: "keyboard",
      value: 3,
      type: "boys",
    },
    {
      instrument: "violin",
      value: 4,
      type: "boys",
    },
    {
      instrument: "cello",
      value: 6,
      type: "boys",
    },
    {
      instrument: "accordion",
      value: 4,
      type: "boys",
    },
    {
      instrument: "drums",
      value: 9,
      type: "girls",
    },
    {
      instrument: "bass",
      value: 3,
      type: "girls",
    },
    {
      instrument: "ukelele",
      value: 6,
      type: "girls",
    },
    {
      instrument: "cymbals",
      value: 7,
      type: "girls",
    },
    {
      instrument: "lead",
      value: 4.9,
      type: "girls",
    },
    {
      instrument: "keyboard",
      value: 6,
      type: "girls",
    },
    {
      instrument: "violin",
      value: 7,
      type: "girls",
    },
    {
      instrument: "cello",
      value: 9,
      type: "girls",
    },
    {
      instrument: "accordion",
      value: 13,
      type: "girls",
    },
  ];
  const config = {
    data: data.reverse(),
    isStack: true,
    xField: "value",
    yField: "instrument",
  };
  return <Bar {...config} />;
};
export default Test;
