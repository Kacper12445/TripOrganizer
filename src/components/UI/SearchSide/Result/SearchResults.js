import React, { useEffect, useState } from "react";
import Card from "../../../common/Card";
import ResultItem from "./ResultItem";
import { useSelector } from "react-redux";

export default function SearchResults() {
  const [hotelData, setHotelData] = useState([]);
  const hotels = useSelector((state) => state.hotel.hotels);

  useEffect(() => {
    setHotelData(hotels);
  }, [hotels]);
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
      {hotelData.map((element, index) => {
        return <ResultItem key={index} hotel={element}></ResultItem>;
      })}
    </Card>
  );
}
