import React from "react";
import Card from "../../../common/Card";
import ResultItem from "./ResultItem";
import { useSelector } from "react-redux";

export default function SearchResults() {
  const hotels = useSelector((state) => state.hotel.hotels);

  return (
    <Card
      flexBasis="80%"
      width="95%"
      backGroundColor="rgba(100, 100, 100, .3)"
      overflow="scroll"
      borderRad="20px"
      justifyContent="center"
      flexWrap="wrap"
    >
      {hotels.map((element, index) => {
        return (
          <ResultItem
            key={index}
            hotel={element}
            visible={true}
            width="90%"
            margin="2% 0"
            // height="50%"
          ></ResultItem>
        );
      })}
    </Card>
  );
}
