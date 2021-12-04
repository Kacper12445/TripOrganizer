import React, { useState, useEffect } from "react";
import Card from "../../../common/Card";
import ResultItem from "./ResultItem";
import { useSelector } from "react-redux";

export default function SearchResults() {
  const hotels = useSelector((state) => state.hotel.hotels);
  const coords = useSelector((state) => state.coord.coords);
  const [ifSet, setIfSet] = useState(false);
  useEffect(() => {
    if (coords.originCoords.isSet && coords.destinationCoords.isSet) {
      setIfSet(true);
    } else {
      setIfSet(false);
    }
  }, [setIfSet, coords.originCoords.isSet, coords.destinationCoords.isSet]);
  return (
    ifSet && (
      <Card
        flexBasis="80%"
        width="95%"
        backGroundColor="rgba(100, 100, 100, .3)"
        overflow="scroll"
        borderRad="5px"
        justifyContent="center"
        flexWrap="wrap"
        margin="0 0 25px 0"
      >
        {hotels.map((element, index) => {
          return (
            <ResultItem
              key={index}
              hotel={element}
              visible={true}
              width="90%"
              margin="2% 0"
            />
          );
        })}
      </Card>
    )
  );
}
