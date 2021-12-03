import React, { useEffect } from "react";
import TripForm from "../Form/TripForm";
import SearchResults from "./SearchResults";
import Card from "../../../common/Card";
import { useSelector } from "react-redux";
import RouteInstruction from "../Route/RouteInstruction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Searching() {
  const hotels = useSelector((state) => state.hotel.hotels);
  const loadingHotel = useSelector((state) => state.hotel.loading);

  useEffect(() => {
    console.log(loadingHotel);
  }, [loadingHotel]);
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
      {loadingHotel ? (
        <FontAwesomeIcon
          icon="spinner"
          pulse
          style={{ color: "black", fontSize: "4.7rem" }}
        />
      ) : (
        hotels.length >= 2 && <SearchResults />
      )}
    </Card>
  );
}
