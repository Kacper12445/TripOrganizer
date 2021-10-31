import React from "react";
import TripForm from "../Form/TripForm";
import SearchResults from "./SearchResults";
import Card from "../../../common/Card";
import { useSelector } from "react-redux";
import RouteInstruction from "../Route/RouteInstruction";

export default function Searching() {
  const hotels = useSelector((state) => state.hotel.hotels);

  return (
    <Card
      flexDirection="column"
      height="100%"
      flexBasis="65%"
      alignItems="center"
      justifyContent="space-around"
    >
      <RouteInstruction />
      <TripForm />
      {hotels.length >= 2 && <SearchResults />}
    </Card>
  );
}
