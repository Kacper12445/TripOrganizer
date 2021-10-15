import React from "react";
import Card from "../../common/Card";
import ResultItem from "./ResultItem";

const DummyData = [
  {
    name: "hotel_1",
  },
  {
    name: "hotel_2",
  },
  {
    name: "hotel_3",
  },
  {
    name: "hotel_4",
  },
  {
    name: "hotel_5",
  },
  {
    name: "hotel_6",
  },
];

export default function SearchResults() {
  return (
    <Card
      flexBasis="75%"
      backGroundColor="yellow"
      flexWrap="wrap"
      overflow="scroll"
      justifyContent="space-around"
      alignItems="center"
      alignContent="space-around"
    >
      {DummyData.map((element, index) => {
        return <ResultItem KEY={index} name={element.name}></ResultItem>;
      })}
    </Card>
  );
}
