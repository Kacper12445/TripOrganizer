import React, { useEffect, useState } from "react";
import Card from "../../../common/Card";
import ResultItem from "./ResultItem";
import { useSelector } from "react-redux";

const DummyData = [
  {
    name: "hotel_1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    name: "hotel_2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    name: "hotel_3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

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
      flexDirection="column"
      backGroundColor="rgba(100, 100, 100, .3)"
      overflow="scroll"
      borderRad="20px"
      // justifyContent="space-around"
      alignItems="center"
      // alignContent="space-around"
    >
      {hotelData.map((element, index) => {
        return <ResultItem key={index} hotel={element}></ResultItem>;
      })}
    </Card>
  );
}
